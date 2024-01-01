# RunPod-Fooocus-API

This is a RunPod Fooocus-API worker that expects a Fooocus-API v0.3.26 instance installed on a RunPod Network Volume.

Ready-to-use Docker Image with this repo's code: https://hub.docker.com/r/3wad/runpod-fooocus-api (use `3wad/runpod-fooocus-api:0.2.4`)

## How to prepare Network Volume
- Create RunPod network volume. 15GB is just enough for the generic Foocus with Juggernaut model. You can increase its size any time if you need additional models, loras etc. But unfortunately, it cannot be reduced back.
- Create a custom Pod Template and use the konieshadow/fooocus-api:latest image. I went with 30GB disk sizes, mount path /workspace, and expose http 8888 and tcp 22.
- Run the network volume with the custom fooocus-api image you've just created. You don't need a strong GPU pod, the installation is CPU and download-intensive, but be aware that some older-gen pods might not support the latest CUDA versions. Let it download and install everything. After the Juggernaut model is downloaded, use the connect button to load into the Fooocus-API docs running on the pod's 8888 port. Here you should try all the API methods you plan to use because additional models are downloaded once you run inpaint, outpaint, upscale, vary and image inputs (canny, face swap etc.) endpoints for the first time.
- After that you are ready to connect to the pod's console and use cp -r /app/* /workspace/ to copy everything into the persistent network volume
- Once everything is copied successfully, you can terminate the pod. You have the network volume ready.
- ---
- Now you need to create your custom docker image that will run on the actual serverless API. Use files in this repo to build your own. Feel free to adjust handler.py based on how you want to make your requests and it's parameters.
- Once you build it, upload it to the Docker Hub.
- Now you create a custom Serverless Pod Template using the Docker Hub image you've just uploaded. Active container disk should be slightly bigger than the size of the worker docker image.
- Create a new Serverless API Endpoint. Make sure to choose your Docker Hub image and not the konieshadow/fooocus-api:latest from step 2. In Advanced settings choose your created network volume.
- Other settings are your choice, but I personally found that using 4090/L4 GPUs + Flashboot is the most cost-effective one. In frequent use, the 4090 is able to return an image in ~8s including cold start, making it ~4x cheaper to run this on RunPod than for example using DALLE-3 API. This fact can of course vary based on datacenter locations and GPU availability.
