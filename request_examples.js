// EXAMPLE REQUEST PAYLOADS

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
        "uov_method": "Upscale (2x)",
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
        "uov_method": "Vary (Strong)",
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
        "outpaint_distance_left": "-1", // -1 for default value (In previous versions was set to 0 as default and could cause errors)
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
    // This endpoint currently doesn't work as expected in Fooocus-API v0.3.29 - See https://github.com/konieshadow/Fooocus-API/issues/149
    // I was able to make it generate output but it was random and not driven by imges as it should. Use the img2img2 for now.
}
// returns:

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
                "cn_type1":"ImagePrompt"
            }
        ],
        "require_base64": true,
        "input_image":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAFDmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDEtMjFUMDM6MjU6MjQrMDEwMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDEtMjFUMDM6MjU6NDMrMDE6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDEtMjFUMDM6MjU6NDMrMDE6MDAiCiAgIHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD0iMjAyNC0wMS0yMVQwMzoyNToyNCswMTAwIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIxIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMSIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICB0aWZmOkltYWdlV2lkdGg9IjEiCiAgIHRpZmY6SW1hZ2VMZW5ndGg9IjEiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMiAyLjMuMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wMS0yMVQwMzoyNTo0MyswMTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+i1twOwAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHfK4NRGMc/GyKmKYRysTSuNjG1uHEx+VW42KYMN9trP9R+vL3vlpZb5VZR4savC/4CbpVrpYiUXO+auGG9nndbTbLndJ7zOd/zPE/nPAeswaSS0uuHIJXOav5pn2MptOxoLGChEytd9IQVXZ0PTAWpaZ+PEi127zZr1Y7711rWoroClibhcUXVssIzwnMbWdXkPeEOJRFeE74QdmlyQeEHU4+UuWByvMzfJmtB/wRY24Qd8V8c+cVKQksJy8txppI5pXIf8yW2aHoxIGufzF50/Ezjw8Esk0zgZZgx8V7ceBiUHTXyh0r5C2QkVxGvkkdjnTgJsrhEzUn1qKwx0aMykuTN/v/tqx4b8ZSr23zQ8GoY7/3QuAvFHcP4OjGM4inUvcB1upqfOYbRD9F3qprzCOxbcHlT1SL7cLUN3c9qWAuXpDqZ1lgM3s6hNQTtd9C8Uu5Z5ZyzJwhuylfdwsEhDEi8ffUHNtVn0MArGcAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAMSURBVAiZY2BgYAAAAAQAAaMKFeMAAAAASUVORK5CYII="
        // The bug in Fooocus-API v0.3.29 causes that the "input_image" is required. You can use this simple 1x1px black placeholder to get around it.
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
        "job_id":"job-id"
    }
}
// returns: Requires active job in process. Hard to test manually but should work.

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
        "outpaint_selections":"Top,Bottom,Left,Right",
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