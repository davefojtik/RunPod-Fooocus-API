# Native
import shutil
import os
import time
import requests
import httpx
import re
import base64
import json
# Dependencies
import runpod
from requests.adapters import HTTPAdapter, Retry

session = requests.Session()
session.mount('http//', HTTPAdapter(max_retries=Retry(total=10, backoff_factor=0.1, status_forcelist=[502,503,504])))

baseurl = "http://127.0.0.1:7866"
genendpoint = "/v1/engine/generate/"
outputpaths = ["/workspace/outputs/files", "/workspace/repositories/Fooocus/outputs"]

# ---------------------------------------------------------------------------- #
#                               Functions                                      #
# ---------------------------------------------------------------------------- #
def wait_for_service(url):
    # Check if the service is ready to receive requests
    while True:
        try:
            requests.get(url)
            return
        except requests.exceptions.RequestException:
            print("Service not ready yet. Retrying...")
        except Exception as err:
            print("Error: ", err)
        time.sleep(0.2)

def processInput(params):
    # Config can be customized to fit different versions of FooocusAPI, Fooocus-API etc.
    config = {
        "baseurl": baseurl,
        "genendpoint": genendpoint,
        "api": {
            ### Query
            "tasks": ("GET", "/tasks"),
            "task": ("GET", "/tasks/"+params.get("task_id","0")),
            "all-models": ("GET", "/v1/engines/all-models"),
            "styles": ("GET", "/v1/engines/styles"),
            "outputs": ("GET", "/outputs/"+params.get("outputs_path","")),
            "inputs": ("GET", "/inputs/"+params.get("inputs_path","")),
            "root": ("GET", "/"),
            ### GenerateV1
            "generate": ("POST", "/v1/engine/generate/"),
            "generate_mask": ("POST", "/v1/tools/generate_mask"),
            "describe-image": ("POST", "/v1/tools/describe-image"),
            "contol": ("POST", "/v1/engine/control")
        },
        # You can send images param values as PNG encoded into base64 string OR as url link string
        "input_imgs": {'controlnet_image':[None,None,None,None], "uov_input_image":None, "inpaint_input_image":None, "inpaint_mask_image_upload":None, "enhance_input_image":None},
        "img_key_name": "cn_img", # What is the name of key targeted in input_imgs lists
        "stream_param": "stream_output", # What is the name of param swiching output streaming (Only available in the new FooocusAPI)
        "inpaint_prefix": False, # Are the inpaint params in sub-param like "advanced_params"? If yes, provide string of the sub-object key
        "compatibility_stream": "preview_url", # For back-compability with Fooocus-API or your servers already expecting previews to be send to them
        "timeout": 300
    }
    # Check if the api_name in the recieved obj is supported
    api_name = params["api_name"]
    if params["api_name"] in config["api"]:
        api_config = config["api"][api_name]
        api_verb = api_config[0]
        api_path = api_config[1]
    else:
        raise Exception("Method '%s' not implemented" % api_name)
    
    # Check for inpaint preset
    def inpaint_preset(params):
        option = params.get("inpaint_preset")
        p = params
        if config["inpaint_prefix"] is not False: p = params ["%s" % config["inpaint_prefix"]]

        if option == "Improve Detail": p.update({"inpaint_disable_initial_latent":False, "inpaint_engine":"None", "inpaint_strength":0.5, "inpaint_respective_field":0.0})
        elif option in ["Modify Content", "Inpaint or Outpaint"]: p.update({"inpaint_disable_initial_latent":True, "inpaint_engine":"v2.6", "inpaint_strength":1.0, "inpaint_respective_field":0.0})
        else: return "Preset not found. Be sure to use exactly one of: 'Improve Detail', 'Modify Content' or 'Inpaint or Outpaint'"
        return True

    if "inpaint_preset" in params:
        result = inpaint_preset(params)
        if result is not True:
            raise Exception("inpaint_preset task failed: " + result)
        
    def process_img(value):
        if re.search(r'https?:\/\/\S+', value) is not None:
            return requests.get(value).content
        elif re.search(r'^[A-Za-z0-9+/]+[=]{0,2}$', value) is not None and value != "None":
            return base64.b64decode(value)
        else:
            return value
    
    for key, value in config["input_imgs"].items():
        if key in params:
            try:
                if type(value) == list:
                    for index, prompt in enumerate(params.get(key, [])):
                        config["input_imgs"][key][index] = process_img(prompt["%" %config["img_key_name"]])
                else:
                    config["input_imgs"][key] = process_img(params[key])
            except Exception as e:
                error_message = str(e)
                print("Image conversion task failed: ", error_message)
                raise Exception ({"error": error_message})

    # Return the processed input
    return {"api_verb":api_verb, "api_path":api_path, "params":params, "config":config}

async def generate(params):
    try:
        if params["api_verb"] == "GET":
            result = session.get(url='%s%s' % (params["config"]["baseurl"], params["api_path"]), timeout=params["config"]["timeout"])
        if params["api_verb"] == "POST":
            # Convert the processed binary image back to url-safe-base64
            for key, value in params["config"]["input_imgs"].items():
                if value is not None:
                    if type(value) == list:
                        for i, value in enumerate(params["config"]["input_imgs"][key]):
                            if isinstance(value, bytes):
                                params["params"][key][i]["%" %params["config"]["img_key_name"]] = base64.b64encode(value).decode('utf-8')
                    elif isinstance(value, bytes):
                        params[key] = base64.b64encode(value).decode('utf-8')
            # If generate endpoint and stream_output is True, stream the previews
            if params["api_path"] == params["config"]["genendpoint"] and params["params"]["%s" % params["config"]["stream_param"]] is True:
                async with httpx.AsyncClient() as client:
                    async with client.stream("POST", url='%s%s' % (params["config"]["baseurl"], params["api_path"]), json=params["params"], timeout=params["config"]["timeout"]) as res:
                        buffer = "" # To collect chunk data if split (protocol limit is ~37k chars in this case)
                        async for chunk in res.aiter_bytes():
                            decoded_chunk = chunk.decode('utf-8').strip()
                            # Skip ping chunks (they start with ':')
                            if decoded_chunk.startswith(":"):
                                continue 
                            # Remove SSE 'data: ' prefix
                            if decoded_chunk.startswith('data: '):
                                decoded_chunk = decoded_chunk.removeprefix('data: ')
                            # Add the decoded chunk to the buffer
                            buffer += decoded_chunk
                            # If the buffer ends with "data:", it means the next chunk starts a new event
                            if buffer.endswith("data:"):
                                buffer = buffer[:-5].strip()  # Strip trailing "data:" and anything extra
                            try:
                                chunk_data = json.loads(buffer)
                                #print(chunk_data) # Debugging chunks
                                buffer = ""  # Reset the buffer after successful parsing

                                yield chunk_data
                                # Check if job completed
                                if chunk_data.get("message") == "Finished": return
                            except json.JSONDecodeError:
                                # If the buffer isn't valid JSON yet, wait for the next chunk
                                continue                               
            elif params["api_path"] == params["config"]["genendpoint"] and params["params"]["%s" % params["config"]["compatibility_stream"]] in params["params"]:
                #TODO: Implement compability streaming for old worker->server streaming
                result = ""
            else:
                result = session.post(url='%s%s' % (params["config"]["baseurl"], params["api_path"]), json=params["params"], timeout=params["config"]["timeout"])

        # --- Return the non-stream result ---
        if result is not None:
            content_type = result.headers.get('Content-Type', '')
            if 'application/json' in content_type:
                yield result.json()
            else:
                yield result.text
    except Exception as e:
        yield {"error": str(e)}

def clearOutput():
    try:
        print("Clearing outputs...")
        for value in outputpaths:
            shutil.rmtree(value)
            os.makedirs(value)
    except Exception as e:
        error_message = str(e)
        raise Exception(error_message)

# ---------------------------------------------------------------------------- #
#                                RunPod Handler                                #
# ---------------------------------------------------------------------------- #
async def handler(job):
    ''' This is the handler function that will be called by the serverless. '''
    try:
        job_input = processInput(job["input"]) # Process the input
    except Exception as err:
        yield {"err": str(err)}
        return
    
    # Stream/send the generator results
    async for result in generate(job_input):
        yield result

    # Check for clear outputs option (defaults to True, send "clear_output":false in your payload to keep the images stored on the network volume.)
    # Also works on standalone but does not make much sense since the workers are stateless.
    clear_output = job["input"].get("clear_output", True)
    if clear_output is True:
        clearOutput()

if __name__ == "__main__":
    wait_for_service(url=baseurl+genendpoint)
    print("Fooocus ready. Starting RunPod...")
    runpod.serverless.start({"handler": handler,"return_aggregate_stream": True})