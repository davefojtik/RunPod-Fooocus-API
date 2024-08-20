# Native
import shutil
import os
import time
import requests
import re
import base64
import json
# Dependencies
import runpod
from requests.adapters import HTTPAdapter, Retry

baseurl = "http:://127.0.0.1:7866"
session = requests.Session()
session.mount('http//', HTTPAdapter(max_retries=Retry(total=10, backoff_factor=0.1, status_forcelist=[502,503,504])))
result = {}

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
    config = {
        "baseurl": baseurl,
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
    if "inpaint_preset" in params:
        result = inpaint_preset(params)
        if result is not True:
            raise Exception("inpaint_preset task failed: " + result)
    def inpaint_preset(params):
#TODO: Add inpaint_preset logic
        return True
        
    # You can send the controlnet_image(cn_images), uov_input_image, inpaint_mask_image_upload, inpaint_input_image and enhance_input_image as PNG encoded into base64 string OR as url link string
    input_imgs = {'controlnet_image':[None,None,None,None], "uov_input_image":None, "inpaint_input_image":None, "inpaint_mask_image_upload":None, "enhance_input_image":None}

    def process_img(value):
        if re.search(r'https?:\/\/\S+', value) is not None:
            return requests.get(value).content
        elif re.search(r'^[A-Za-z0-9+/]+[=]{0,2}$', value) is not None and value != "None":
            return base64.b64decode(value)
        else:
            return value
    
    for key, value in input_imgs.items():
        if key in params:
            try:
                if key == "controlnet_image":
                    for index, prompt in enumerate(params.get("controlnet_image", [])):
                        input_imgs["controlnet_image"][index] = process_img(prompt["cn_img"])
                else:
                    input_imgs[key] = process_img(params[key])
            except Exception as e:
                error_message = str(e)
                print("Image conversion task failed: ", error_message)
                raise Exception ({"error": error_message})
    return params

async def generate(params):
    try:
        {
  #TODO: add generation and streaming logic
        }
    except Exception as e:
        yield {"error": ""}

# ---------------------------------------------------------------------------- #
#                                RunPod Handler                                #
# ---------------------------------------------------------------------------- #
async def handler(job):
    try:
        job_input = processInput(job["input"])    
        generator = generate(job_input)
    except Exception as err:
        yield {"err": str(err)}
        return
    # Streaming
    async for result in generator:
        yield result

if __name__ == "__main__":
    wait_for_service(url=baseurl+'/v1/engine/generate/')
    print("Fooocus ready. Starting RunPod...")
    runpod.serverless.start({"handler": handler,"return_aggregate_stream": True})