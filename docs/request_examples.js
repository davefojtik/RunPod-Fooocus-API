// ########################
// EXAMPLE REQUEST PAYLOADS
// ########################
// The requests can be done in several possible ways:
// - Send the payload (with require_base64:true on img endpoints) to https://api.runpod.ai/v2/$your-endpont-id/runsync, in this case your app will simply send a request and wait for the final response. (This works fine if the requests don't take too long and you don't have enough of them to be queued)
// - Send the payload (with require_base64:true on img endpoints) to https://api.runpod.ai/v2/$your-endpont-id/run, in this async case your app will send a request, immediately receive obj with runpod job id that you can then use to receive the final result on https://api.runpod.ai/v2/$your-endpoint-id/status/$id
//   To get notified when the job is finished, you can either use the Fooocus-API webhook feature, or you can just periodically fetch the job's status endpoint
// - You can also customize the handler.py and add your own logic at the end, for example to save the image files into some external storage.

// ----------------------------------------------------
// Part one: Minimal required
// ----------------------------------------------------

// **************************
home =
// **************************
{
    "input":{
        "api_name":"home"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':'Swagger-UI to: <a href=\"/docs\">/docs</a>', "status":"COMPLETED"}

// ----------------
// **************************
ping =
// **************************
{
    "input":{
        "api_name":"ping"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':'pong', "status":"COMPLETED"}

// ----------------
// **************************
txt2Img =
// **************************
{
    "input":{
        "api_name":"txt2img",
        "prompt":"your-prompt",
        "require_base64": true
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
txt2imgip =
// **************************
{
    "input":{
        "api_name":"txt2img-ip",
        "prompt":"your-prompt",
        "image_prompts": [
            {
                "cn_img":"url-or-base64",
                "cn_stop":0.5,
                "cn_weight":1,
                "cn_type":"ImagePrompt"
            }
        ],
        "require_base64": true
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
upscale_vary =   // !! Caution! This endpoint is converting into multipart/form-data request, all params have to be strings !!
// **************************
// UPSCALE
{
    "input":{
        "api_name":"upscale-vary",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "uov_method": "Upscale (2x)",
        "require_base64": "true"
    }
}
i =
// VARY
{
    "input":{
        "api_name":"upscale-vary",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "uov_method": "Vary (Strong)",
        "require_base64": "true"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
upscale_vary2 =
// **************************
// UPSCALE
{
    "input":{
        "api_name":"upscale-vary2",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "uov_method": "Upscale (1.5x)",
        "require_base64": true
    }
}
i =
// VARY
{
    "input":{
        "api_name":"upscale-vary2",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "uov_method": "Vary (Subtle)",
        "require_base64": true
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
inpaint_outpaint = // !! Caution! This endpoint is converting into multipart/form-data request, all params have to be strings !!
// **************************
// INPAINT
{
    "input":{
        "api_name":"inpaint-outpaint",
        "input_image":"url-or-base64",
        "input_mask":"url-or-base64",
        "inpaint_additional_prompt":"your-prompt",
        "require_base64": "true"
    }
}
i =
// OUTPAINT
{
    "input":{
        "api_name":"inpaint-outpaint",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "outpaint_selections":"Top,Bottom,Left,Right",
        "outpaint_distance_left": "-1", // -1 for default value (307px), otherwise number of pixels
        "outpaint_distance_right": "-1",
        "outpaint_distance_top": "-1",
        "outpaint_distance_bottom": "-1",
        "require_base64": "true"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
inpaint_outpaint2 =
// **************************
// INPAINT
{
    "input":{
        "api_name":"inpaint-outpaint2",
        "input_image":"url-or-base64",
        "input_mask":"url-or-base64",
        "inpaint_additional_prompt":"your-prompt",
        "require_base64": true
    }
}
i =
// OUTPAINT
{
    "input":{
        "api_name":"inpaint-outpaint2",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "outpaint_selections":["Top","Bottom"],
        "outpaint_distance_left": -1,
        "outpaint_distance_right": -1,
        "outpaint_distance_top": -1,
        "outpaint_distance_bottom": -1,
        "require_base64": true
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
img2img = // !! Caution! This endpoint is converting into multipart/form-data request, all params have to be strings !!
// **************************
{
    "input":{
        "api_name":"img2img",
        "prompt":"your-prompt",
        "cn_img1":"url-or-base64",
        "cn_weight1":"1",
        "cn_stop1":"0.5",
        "cn_type1":"ImagePrompt",
        "require_base64": "true"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
img2img2 =
// **************************
{
    "input":{
        "api_name":"img2img2",
        "prompt":"your-prompt",
        "image_prompts":[
            {
                "cn_img":"url-or-base64",
                "cn_stop":0.5,
                "cn_weight":1,
                "cn_type":"ImagePrompt"
            }
        ],
        "require_base64": true
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", "output": [{"base64":"your-img-base64", "finish_reason": "SUCCESS", "seed":"seed-number", "url": "http://network-volume-local-img-url.png"}], "status": "COMPLETED" }

// ----------------
// **************************
queryjob =
// **************************
{
    "input":{
        "api_name":"queryjob",
        "job_id":"fooocus-job-id"
    }
}
// returns: {"delayTime": 0, "executionTime": 0,"id": "runpod-job-id","output": {"job_id": "fooocus-job-id", "job_type": "Text to Image", "job_stage": "WAITING", "job_progress": 0, "job_status": "string", "job_step_preview": "string", "job_result": [{"base64": "string","url": "string","seed": "string","finish_reason": "SUCCESS"}]},"status": "COMPLETED"}

// ----------------
// **************************
jobqueue =
// **************************
{
    "input":{
        "api_name":"jobqueue"
    }
}
// returns: {"delayTime": 0, "executionTime": 0,"id": "runpod-job-id","output": {"finished_size": 99,"last_job_id": "last-fooocus-job-id", "running_size": 0},"status": "COMPLETED"}

// ----------------
// **************************
jobhistory =
// **************************
{
    "input":{
        "api_name":"jobhistory"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':{"queue": [],"history": []}, "status":"COMPLETED"}

// ----------------
// **************************
stop =
// **************************
{
    "input":{
        "api_name":"stop"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':{"msg": "success"}, "status":"COMPLETED"}

// ----------------
// **************************
describe = // !! Caution! This endpoint is converting into multipart/form-data request, all params have to be strings !!
// **************************
{
    "input":{
        "api_name":"describe",
        "type":"Photo",
        "image":"url-or-base64"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id": "runpod-job-id", "output": {"describe": "the picture shows a picture"},"status": "COMPLETED"}

// ----------------
// **************************
models =
// **************************
{
    "input":{
        "api_name":"models"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':{"model_filenames": ["string"],"lora_filenames": ["string"]}, "status":"COMPLETED"}

// ----------------
// **************************
models_refresh =
// **************************
{
    "input":{
        "api_name":"models-refresh",
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':{"model_filenames": ["string"],"lora_filenames": ["string"]}, "status":"COMPLETED"}

// ----------------
// **************************
styles =
// **************************
{
    "input":{
        "api_name":"styles"
    }
}
// returns: {"delayTime": 0, "executionTime": 0, "id":"runpod-job-id", 'output':["string"], "status":"COMPLETED"}




// ----------------------------------------------------
// Part two: Full payload
// ----------------------------------------------------
// The basic idea of params on v1/v2 (multipart/form-data vs. application/json) endpoints is: 
// on v2 params can be standard json format, on v1 they have to be sent stringified.

v1 = 
{
    "input":{
        "api_name":"inpaint-outpaint",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "outpaint_selections":"Top,Bottom,Left,Right", // This param is special. It's expecting "Python Literals seperated by commas". That's why it's not a stringified array in this case.
        "outpaint_distance_left": "-1",
        "require_base64": "true",
        "style_selections": "[\"Fooocus V2\", \"Fooocus Enhance\", \"Fooocus Sharp\"]",
        "advanced_params": "{\"adaptive_cfg\":7}"
    }
}

v2 = 
{
    "input":{
        "api_name":"inpaint-outpaint",
        "prompt":"your-original-prompt",
        "input_image":"url-or-base64",
        "outpaint_selections":["Top","Bottom","Left","Right"],
        "outpaint_distance_left": -1,
        "require_base64": true,
        "style_selections": ["Fooocus V2", "Fooocus Enhance", "Fooocus Sharp"],
        "advanced_params": {
            "adaptive_cfg":7
        }
    }
}