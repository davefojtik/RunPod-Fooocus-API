import time
import runpod
import requests
from requests_toolbelt import MultipartEncoder
from requests.adapters import HTTPAdapter, Retry

sd_session = requests.Session()
retries = Retry(total=10, backoff_factor=0.1, status_forcelist=[502, 503, 504])
sd_session.mount('http://', HTTPAdapter(max_retries=retries))


# ---------------------------------------------------------------------------- #
#                               Functions                                      #
# ---------------------------------------------------------------------------- #

def wait_for_service(url):
    '''
    Check if the service is ready to receive requests.
    '''
    while True:
        try:
            requests.get(url)
            return
        except requests.exceptions.RequestException:
            print("Service not ready yet. Retrying...")
        except Exception as err:
            print("Error: ", err)

        time.sleep(1)


def run_inference(params):
    config = {
        "baseurl": "http://127.0.0.1:8888",
        "api": {
            "txt2img":  ("POST", "/v1/generation/text-to-image"),
            "upscale-vary": ("POST", "/v1/generation/image-upscale-vary"),
            "inpaint-outpaint": ("POST", "/v1/generation/image-inpait-outpaint"),
            "img2img":  ("POST", "/v1/generation/image-prompt"),
            "queryjob": ("GET", "/v1/generation/query-job"),
            "jobqueue": ("GET", "/v1/generation/job-queue"),
            "models": ("GET", "/v1/engines/all-models"),
            "models-refresh": ("POST", "/v1/engines/refresh-models"),
            "styles": ("GET", "/v1/engines/styles")
        },
        "timeout": 300
    }
    # Check if the api_name in the recieved obj is supported
    api_name = params["api_name"]
    path = None
    if api_name in config["api"]:
        api_config = config["api"][api_name]
    else:
        raise Exception("Method '%s' not yet implemented" % api_name)
    #
    api_verb = api_config[0]
    api_path = api_config[1]
    response = {}

    if api_verb == "GET":
        response = sd_session.get(
                url='%s%s' % (config["baseurl"], api_path),
                timeout=config["timeout"])

    if api_verb == "POST":
        # The request should be multipart/form-data (img-prompt, upscale, vary, ...). Convert the application/json data into it.
        if params["api_content_type"] == "multipart/form-data":
            try:
                img_url = params.get('input_image')
                img_content = requests.get(img_url).content
                # Remove the input_image key/value from original request data (it gets confused otherwise)
                del params['input_image']
                # Convert
                multipart_data = MultipartEncoder(fields={'input_image': ('image.png', img_content, 'image/png'), **params})
                headers = {'Content-Type': multipart_data.content_type}
                response = sd_session.post(
                    url='%s%s' % (config["baseurl"], api_path),
                    data=multipart_data,
                    headers=headers,
                    timeout=config["timeout"])
            except requests.RequestException as e:
                print("Request failed", e)
                return None
        # The final request should be application/json. Send the original request data
        else:
            response = sd_session.post(
                url='%s%s' % (config["baseurl"], api_path),
                json=params, 
                timeout=config["timeout"])
    return response.json()

# ---------------------------------------------------------------------------- #
#                                RunPod Handler                                #
# ---------------------------------------------------------------------------- #
def handler(event):
    '''
    This is the handler function that will be called by the serverless.
    '''

    json = run_inference(event["input"])

    # return the output that you want to be returned like pre-signed URLs to output artifacts
    return json


if __name__ == "__main__":
    wait_for_service(url='http://127.0.0.1:8888/v1/generation/text-to-image')

    print("WebUI API Service is ready. Starting RunPod...")

    runpod.serverless.start({"handler": handler})