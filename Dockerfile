# ---------------------------------------------------------------------------- #
#                         Part 1: Download the files                           #
# ---------------------------------------------------------------------------- #
FROM alpine/git:2.43.0 as download
COPY builder/clone.sh /clone.sh

# Clone the repos
# Fooocus-API
RUN . /clone.sh /workspace https://github.com/konieshadow/Fooocus-API.git 074a956d2fc6e12e9b669cfe6611fd576dd7e315
# Fooocus
RUN . /clone.sh /workspace/repositories/Fooocus https://github.com/lllyasviel/Fooocus.git 624f74a1ed78ea09467c856cef35aeee0af863f6

RUN apk add --no-cache wget
# Models (You can use cloud links with RUN wget or COPY to load files from your PC)
#RUN wget -q -O /workspace/repositories/Fooocus/models/checkpoints/juggernautXL_version6Rundiffusion.safetensors https://huggingface.co/lllyasviel/fav_models/resolve/main/fav/juggernautXL_version6Rundiffusion.safetensors
    # OR
# COPY your/path_relative_to_dockerfile/model.safetensors /workspace/repositories/Fooocus/models/checkpoints/destinationmodelname.safetensors

# These are all the models Fooocus needs by default
COPY models/juggernautXL_version6Rundiffusion.safetensors /workspace/repositories/Fooocus/models/checkpoints/juggernautXL_version6Rundiffusion.safetensors
COPY models/sd_xl_offset_example-lora_1.0.safetensors /workspace/repositories/Fooocus/models/loras/sd_xl_offset_example-lora_1.0.safetensors
COPY models/sdxl_lcm_lora.safetensors /workspace/repositories/Fooocus/models/loras/sdxl_lcm_lora.safetensors
COPY models/fooocus_inpaint_head.pth /workspace/repositories/Fooocus/models/inpaint/fooocus_inpaint_head.pth
COPY models/inpaint.fooocus.patch /workspace/repositories/Fooocus/models/inpaint/inpaint.fooocus.patch
COPY models/inpaint_v25.fooocus.patch /workspace/repositories/Fooocus/models/inpaint/inpaint_v25.fooocus.patch
COPY models/inpaint_v26.fooocus.patch /workspace/repositories/Fooocus/models/inpaint/inpaint_v26.fooocus.patch
COPY models/control-lora-canny-rank128.safetensors /workspace/repositories/Fooocus/models/controlnet/control-lora-canny-rank128.safetensors
COPY models/fooocus_xl_cpds_128.safetensors /workspace/repositories/Fooocus/models/controlnet/fooocus_xl_cpds_128.safetensors
COPY models/fooocus_ip_negative.safetensors /workspace/repositories/Fooocus/models/controlnet/fooocus_ip_negative.safetensors
COPY models/ip-adapter-plus_sdxl_vit-h.bin /workspace/repositories/Fooocus/models/controlnet/ip-adapter-plus_sdxl_vit-h.bin
COPY models/ip-adapter-plus-face_sdxl_vit-h.bin /workspace/repositories/Fooocus/models/controlnet/ip-adapter-plus-face_sdxl_vit-h.bin
COPY models/fooocus_upscaler_s409985e5.bin /workspace/repositories/Fooocus/models/upscale_models/fooocus_upscaler_s409985e5.bin
COPY models/clip_vision_vit_h.safetensors /workspace/repositories/Fooocus/models/clip_vision/clip_vision_vit_h.safetensors
COPY models/xlvaeapp.pth /workspace/repositories/Fooocus/models/vae_approx/xlvaeapp.pth
COPY models/vaeapp_sd15.pt /workspace/repositories/Fooocus/models/vae_approx/vaeapp_sd15.pth
COPY models/xl-to-v1_interposer-v3.1.safetensors /workspace/repositories/Fooocus/models/vae_approx/xl-to-v1_interposer-v3.1.safetensors
COPY models/fooocus_expansion.bin /workspace/repositories/Fooocus/models/prompt_expansion/fooocus_expansion/pytorch_model.bin
COPY models/detection_Resnet50_Final.pth /workspace/repositories/Fooocus/models/controlnet/detection_Resnet50_Final.pth
COPY models/parsing_parsenet.pth /workspace/repositories/Fooocus/models/controlnet/parsing_parsenet.pth
COPY models/model_base_caption_capfilt_large.pth /workspace/repositories/Fooocus/models/clip_vision/model_base_caption_capfilt_large.pth

# ---------------------------------------------------------------------------- #
#                        Part 2: Build the final image                         #
# ---------------------------------------------------------------------------- #
FROM python:3.10.13-slim as build_final_image
ENV DEBIAN_FRONTEND=noninteractive \
    PIP_PREFER_BINARY=1 \
    LD_PRELOAD=libtcmalloc.so \
    PYTHONUNBUFFERED=1
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN export TORCH_COMMAND='pip install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/rocm5.6'

# Update and upgrade the system packages
RUN apt-get update && \
    apt install -y \
    fonts-dejavu-core rsync git jq moreutils aria2 wget libgoogle-perftools-dev procps libgl1 libglib2.0-0 && \
    apt-get autoremove -y && rm -rf /var/lib/apt/lists/* && apt-get clean -y

RUN --mount=type=cache,target=/cache --mount=type=cache,target=/root/.cache/pip \
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Copy downloaded data to the final image
COPY --from=download /workspace/ /workspace/
# Change Fooocus configs
COPY src/config.txt /workspace/repositories/Fooocus/config.txt
COPY src/default.json /workspace/repositories/Fooocus/presets/default.json

# Install Python dependencies
COPY builder/requirements.txt /requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --upgrade pip && \
    pip install --upgrade -r /requirements.txt --no-cache-dir && \
    rm /requirements.txt

ADD src .

# Cleanup
RUN apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

RUN chmod +x /start.sh
CMD /start.sh