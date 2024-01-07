// This file shows example API call payloads to your RunPod endpoint in NodeJS
// Feel free to do pull requests with additional examples or in different languages
const https = require('https');

// -------
// Txt2Img
// -------
const Txt2Img = {
    "input":{
        "api_name": "txt2img", // String (This is our own param to define which endpoint we want to use in handler.py)
        "prompt": "sample, (prompt:1.4)", // String
        "negative_prompt": "sample negative", // String
        "style_selections": ['Cinematic', 'Masterpiece'], // Array of Strings
        "performance_selection": "Speed", // String
        "aspect_ratios_selection": "1024×1024", // String (use special "×" unicode char or from v0.3.15 standard "x" or "*" chars)
        "image_number": 1, // Number
        "image_seed": -1, // Number or use string with long seeds to avoid overflow
        "sharpness": 2, // Number
        "guidance_scale": 4, // Number
        "base_model_name": "juggernautXL_version6Rundiffusion.safetensors", // String
        "refiner_model_name": "None", // String
        "refiner_switch": 0.8, // Number
        "loras": [ // Array of Objects
            {
                "model_name": "sd_xl_offset_example-lora_1.0.safetensors",
                "weight": 0.1
            }
        ], 
        "advanced_params": { // Object
            "disable_preview": false, // Boolean
            "adm_scaler_positive": 1.5, // Number
            "adm_scaler_negative": 0.8, // Number
            "adm_scaler_end": 0.3, // Number
            "refiner_swap_method": "joint", // String
            "adaptive_cfg": 7, // Number
            "sampler_name": "dpmpp_2m_sde_gpu", // String
            "scheduler_name": "karras", // String
            "overwrite_step": -1, // Number
            "overwrite_switch": -1, // Number
            "overwrite_width": -1, // Number
            "overwrite_height": -1, // Number
            "overwrite_vary_strength": -1, // Number
            "overwrite_upscale_strength": -1, // Number
            "mixing_image_prompt_and_vary_upscale": false, // Boolean
            "mixing_image_prompt_and_inpaint": false, // Boolean
            "debugging_cn_preprocessor": false, // Boolean
            "skipping_cn_preprocessor": false, // Boolean
            "controlnet_softness": 0.25, // Number
            "canny_low_threshold": 64, // Number
            "canny_high_threshold": 128, // Number
            "freeu_enabled": false, // Boolean
            "freeu_b1": 1.01, // Number
            "freeu_b2": 1.02, // Number
            "freeu_s1": 0.99, // Number
            "freeu_s2": 0.95, // Number
            "debugging_inpaint_preprocessor": false, // Boolean
            "inpaint_disable_initial_latent": false, // Boolean
            "inpaint_engine": "v1", // String
            "inpaint_strength": 1, // Number
            "inpaint_respective_field": 1 // Number
        },
        "require_base64": true, // Boolean
        "async_process": false // Boolean
    }
};

// ------------
// Upscale-Vary (V1 multipart/form-data endpoint)
// ------------
const UpscaleVary = {
    "input":{
        "api_name": "upscale-vary", // String (This is our own param to define which endpoint we want to use in handler.py)
        "uov_method": "Vary (Subtle)", // String
        "prompt": "sample, (prompt:1.4)", // String
        "negative_prompt": "sample negative", // String
        "style_selections": "['Cinematic', 'Masterpiece']", // Stringified Array of Strings
        "performance_selection": "Speed", // String
        "aspect_ratios_selection": "1024×1024", // String
        "image_number": "1", // String
        "image_seed": "-1", // String
        "sharpness": "2", // String
        "guidance_scale": "4", // String
        "base_model_name": "juggernautXL_version6Rundiffusion.safetensors", // String
        "refiner_model_name": "None", // String
        "refiner_switch": "0.8", // String
        "loras": "[{\"model_name\": \"sd_xl_offset_example-lora_1.0.safetensors\", \"weight\": \"0.1\"}]", // Stringified Array of Object

        "require_base64": "true", // String
        "async_process": "false", // String
        "input_image": "https://your-img.url/123" // String of publicly accessible URL link or Url-safe Base64 encoded binary img data
    }
}
// ------------
// Inpaint-Outpaint (V1 multipart/form-data endpoint)
// ------------
const InpaintOutpaint = {
    "input":{
        "api_name": "inpaint-outpaint", // String (This is our own param to define which endpoint we want to use in handler.py)
        "prompt": "sample, (prompt:1.4)", // String
        "negative_prompt": "sample negative", // String
        "style_selections": "['Cinematic', 'Masterpiece']", // Stringified Array of Strings
        "performance_selection": "Speed", // String
        "aspect_ratios_selection": "1024×1024", // String
        "image_number": "1", // String
        "image_seed": "-1", // String
        "sharpness": "2", // String
        "guidance_scale": "4", // String
        "base_model_name": "juggernautXL_version6Rundiffusion.safetensors", // String
        "refiner_model_name": "None", // String
        "refiner_switch": "0.8", // String
        "loras": "[{\"model_name\": \"sd_xl_offset_example-lora_1.0.safetensors\", \"weight\": \"0.1\"}]", // Stringified Array of Object

        "require_base64": "true", // String
        "async_process": "false", // String
        "input_image": "https://your-img.url/123", // String of publicly accessible URL link or Url-safe Base64 encoded binary img data
        "input_mask": "https://your-mask.url/123", // String of publicly accessible URL link or Url-safe Base64 encoded binary img data
        "inpaint_additional_prompt": "text", // String
        "outpaint_selections": "Top,Bottom", // String of Python Literals divided by comma without space
        "outpaint_distance_left": "-1", // String (-1 for default value, otherwise amount of pixels)
        "outpaint_distance_right": "-1", // String
        "outpaint_distance_top": "-1", // String
        "outpaint_distance_bottom": "-1" // String
    }
}

const options = {
    host: 'api.runpod.ai',
    port: '443',
    path: '/v2/yourrunpodendpointid/run',
    method: 'POST',
    headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer XXXXXXX..'
    }
};

let req = https.request(options, (res)=>{
    let body=[];
    res.on('data', (chunk)=>{body.push(chunk);});
    res.on('end', ()=>{
        return Buffer.concat(body).toString();
    }); 
});
req.write(Txt2Img);
req.end();

req.on('error', (e)=>{console.log(e)});
