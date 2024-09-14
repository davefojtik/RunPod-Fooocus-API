/** ## EXAMPLE REQUEST PAYLOADS 
 * -----------------------------
 * The requests can be done in several possible ways:
 * - Send the payload to https://api.runpod.ai/v2/$your-endpont-id/runsync, in this case your app will simply send a request and wait for the final response synchronously and in blocking way.
 * - Send the payload to https://api.runpod.ai/v2/$your-endpont-id/run, in this case your app will send an async request, immediately receive obj with runpod job id that you can then use to receive the final result on https://api.runpod.ai/v2/$your-endpoint-id/status/$id
 * To get notified when the async job is finished, you can either use the Fooocus webhook feature, or you can just periodically GET the https://api.runpod.ai/v2/$your-endpont-id/status/$job-id
 * Alternatively, you can POST the https://api.runpod.ai/v2/$your-endpont-id/stream/$job-id, in this case your app will perform stream connection to the worker and will periodically recieve responses including task previews in real time
 * - You can also customize the handler.py and add your own logic required by your project.
*/

/** ### Contents:
* 1. Minimal required
* 2. Full payload
* 3. Custom params (async preview stream, ..)
*/

// ----------------------------------------------------
// 1: Minimal required
// ----------------------------------------------------

tasks =
{
    "input":{
        "api_name":"tasks"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':{"history": [], "current": [], "pending": []}, "status":"COMPLETED"}

task =
{
    "input":{
        "api_name":"task",
        "task_id": "000-t4sk-uu1d"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':{  }, "status":"COMPLETED"}

all_models =
{
    "input":{
        "api_name":"all-models"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": {"model_filenames": ["juggernautXL_v8Rundiffusion.safetensors"], "lora_filenames": []}, "status": "COMPLETED" }

styles =
{
    "input":{
        "api_name":"styles"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": ["Fooocus V2","Random Style",...], "status": "COMPLETED" }

outputs =
{
    "input":{
        "api_name":"outputs",
        "outputs_path":"/path/to/output.png"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": {  }, "status": "COMPLETED" }

inputs =
{
    "input":{
        "api_name":"inputs",
        "inputs_path":"/path/to/input"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": {  }, "status": "COMPLETED" }

root =
{
    "input":{
        "api_name":"root",
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": {  }, "status": "COMPLETED" }


generate =
{
    "input":{
        "api_name":"generate",
        "prompt":"your prompt, masterpiece"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": {  }, "status": "COMPLETED" }

// TODO: Finish examples for new endpoints