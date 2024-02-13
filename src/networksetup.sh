#!/bin/bash
# Config
VERSION="0.3.30"
API_SHA="074a956d2fc6e12e9b669cfe6611fd576dd7e315"
FOOOCUS_SHA="624f74a1ed78ea09467c856cef35aeee0af863f6"
VOLUME_PATH="/workspace"
VOLUME_SIZE="20GB"

# Check if network volume exists
if [ ! -d "$VOLUME_PATH" ]; then
    echo "ERROR: $VOLUME_PATH" 
    echo "not found. Please check your RunPod Pod volume mount settings and try again."
    exit 1
fi

. /clone.sh /app https://github.com/konieshadow/Fooocus-API.git $API_SHA
. /clone.sh /app/repositories/Fooocus https://github.com/lllyasviel/Fooocus.git $FOOOCUS_SHA

echo "Downloading models..."
# Download all models (you might not need all and could save some network space depending on what endpoints and settings you'll use)
curl -o /app/repositories/Fooocus/models/checkpoints/juggernautXL_version6Rundiffusion.safetensors -L https://huggingface.co/lllyasviel/fav_models/resolve/main/fav/juggernautXL_version6Rundiffusion.safetensors?download=true && echo "1/21"
curl -o /app/repositories/Fooocus/models/loras/sd_xl_offset_example-lora_1.0.safetensors -L https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_offset_example-lora_1.0.safetensors?download=true && echo "2/21"
curl -o /app/repositories/Fooocus/models/loras/sdxl_lcm_lora.safetensors -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/sdxl_lcm_lora.safetensors?download=true && echo "3/21"
curl -o /app/repositories/Fooocus/models/inpaint/fooocus_inpaint_head.pth -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/fooocus_inpaint_head.pth?download=true && echo "4/21"
curl -o /app/repositories/Fooocus/models/inpaint/inpaint.fooocus.patch -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/inpaint.fooocus.patch?download=true && echo "5/21"
curl -o /app/repositories/Fooocus/models/inpaint/inpaint_v25.fooocus.patch -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/inpaint_v25.fooocus.patch?download=true && echo "6/21"
curl -o /app/repositories/Fooocus/models/inpaint/inpaint_v26.fooocus.patch -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/inpaint_v26.fooocus.patch?download=true && echo "7/21"
curl -o /app/repositories/Fooocus/models/controlnet/control-lora-canny-rank128.safetensors -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/control-lora-canny-rank128.safetensors?download=true && echo "8/21"
curl -o /app/repositories/Fooocus/models/controlnet/fooocus_xl_cpds_128.safetensors -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/fooocus_xl_cpds_128.safetensors?download=true && echo "9/21"
curl -o /app/repositories/Fooocus/models/controlnet/fooocus_ip_negative.safetensors -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/fooocus_ip_negative.safetensors?download=true && echo "10/21"
curl -o /app/repositories/Fooocus/models/controlnet/ip-adapter-plus_sdxl_vit-h.bin -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/ip-adapter-plus_sdxl_vit-h.bin?download=true && echo "11/21"
curl -o /app/repositories/Fooocus/models/controlnet/ip-adapter-plus-face_sdxl_vit-h.bin -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/ip-adapter-plus-face_sdxl_vit-h.bin?download=true && echo "12/21"
curl -o /app/repositories/Fooocus/models/upscale_models/fooocus_upscaler_s409985e5.bin -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/fooocus_upscaler_s409985e5.bin?download=true && echo "13/21"
curl -o /app/repositories/Fooocus/models/clip_vision/clip_vision_vit_h.safetensors -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/clip_vision_vit_h.safetensors?download=true && echo "14/21"
curl -o /app/repositories/Fooocus/models/vae_approx/xlvaeapp.pth -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/xlvaeapp.pth?download=true && echo "15/21"
curl -o /app/repositories/Fooocus/models/vae_approx/vaeapp_sd15.pth -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/vaeapp_sd15.pt?download=true && echo "16/21"
curl -o /app/repositories/Fooocus/models/vae_approx/xl-to-v1_interposer-v3.1.safetensors -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/xl-to-v1_interposer-v3.1.safetensors?download=true && echo "17/21"
curl -o /app/repositories/Fooocus/models/prompt_expansion/fooocus_expansion/pytorch_model.bin -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/fooocus_expansion.bin?download=true && echo "18/21"
curl -o /app/repositories/Fooocus/models/controlnet/detection_Resnet50_Final.pth -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/detection_Resnet50_Final.pth?download=true && echo "19/21"
curl -o /app/repositories/Fooocus/models/controlnet/parsing_parsenet.pth -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/parsing_parsenet.pth?download=true && echo "20/21"
curl -o /app/repositories/Fooocus/models/clip_vision/model_base_caption_capfilt_large.pth -L https://huggingface.co/3WaD/RunPod-Fooocus-API/resolve/main/v0.3.30/model_base_caption_capfilt_large.pth?download=true && echo "21/21"

# Replace Fooocus Configs
cp -r /config.txt /app/repositories/Fooocus/config.txt
cp -r /default.json /app/repositories/Fooocus/presets/default.json

echo "Transfering everything into the network volume..."
# Transfer everything into the network volume
rm -r $VOLUME_PATH/* 2>/dev/null || true
cp -r /app/* $VOLUME_PATH/
# Check if successfull
if [ $? -eq 0 ]; then
    echo "Transfered successfullly!"
else
    echo "ERROR: Failed to transfer files. Make sure you set big enough size for the volume and try again. By default, the required space for everything is "
    echo "$VOLUME_SIZE"
    rm -r $VOLUME_PATH/* 2>/dev/null || true
    exit 1
fi

echo "Setup complete! You can now terminate the pod and create your serverless worker."