![Static Badge](https://img.shields.io/badge/API_version-0.3.29-blue) ![Static Badge](https://img.shields.io/badge/API_coverage-100%25-vividgreen) ![Static Badge](https://img.shields.io/badge/API_tests-passed-vividgreen) ![Static Badge](https://img.shields.io/badge/Known_bugs-1-red) ![Static Badge](https://img.shields.io/badge/Fooocus_version-2.0.78-lightgrey)

# RunPod-Fooocus-API

This is a RunPod Fooocus-API worker that expects a **Fooocus-API `v0.3.29`** instance installed on a RunPod Network Volume.  
For ready-to-use serverless endpoint image with this repo's code use: [`3wad/runpod-fooocus-api:0.3.29`](https://hub.docker.com/r/3wad/runpod-fooocus-api/tags)

## How to prepare Network Volume
- [**Create RunPod network volume:**](https://www.runpod.io/console/user/storage)
  17GB is just enough for the generic Foocus with Juggernaut and all controlnet models. You can increase its size any time if you need additional models, loras etc. But unfortunately, it cannot be reduced back without creating new one.
- [**Create a custom Pod Template:**](https://www.runpod.io/console/user/templates) and use the `konieshadow/fooocus-api:v0.3.29` image. I went with 30GB disk sizes, mount path `/workspace`, and expose `http 8888` and `tcp 22`.
- [**Run a GPU pod:**](https://www.runpod.io/console/gpu-secure-cloud) with network volume and custom fooocus-api template you've just created. You don't need a strong GPU pod, the installation is CPU and download-intensive, but be aware that some older-gen pods might not support the required CUDA versions. Let it download and install everything. After the Juggernaut model is downloaded, use the connect button to load into the Fooocus-API docs running on the pod's 8888 port. Here you should try all the API methods you plan to use. Not only to verify they work, but also because additional up-to-date models are downloaded once you run inpaint, outpaint, upscale, vary and img2img (canny, face swap etc.) endpoints for the first time.
- After that you are ready to connect to the pod's console and use `cp -r /app/* /workspace/` to copy everything into the persistent network volume
- Once everything is copied successfully, you can terminate the pod. You have the network volume ready.
---
- Now you can use our premade image: `3wad/runpod-fooocus-api:0.3.29` and skip the next step OR create your custom docker image from this repo that will run on the actual serverless API. Feel free to adjust the code to your needs.
- *If you built your own image, upload it to the Docker Hub.*
- [**Create a custom Serverless Pod Template:**](https://www.runpod.io/console/serverless/user/templates) using the Docker Hub image you've just uploaded (or our premade one). Active container disk should be slightly bigger than the size of that docker image. In the case of our prebuild one, it's currently about 13.7GB
- [**Create a new Serverless API Endpoint:**](https://www.runpod.io/console/serverless) Make sure to choose your (or our) Docker Hub image and not the `konieshadow/fooocus-api` from the step 2. In Advanced settings choose your created network volume.
- Other settings are your choice, but I personally found that using 4090/L4 GPUs + Flashboot is the most cost-effective one. In frequent use, the 4090 is able to return a txt2img in ~8s including cold start, making it **~25x** cheaper to run Fooocus on RunPod than for example using DALLE-3 API. **(01/24 prices: 0,0016usd/img vs 0,04usd/img), This fact can of course vary based on datacenter locations and GPU availability.*

## How to send requests
[request_examples.js](https://github.com/davefojtik/RunPod-Fooocus-API/blob/main/request_examples.js) contain example payloads for all endpoints on your serverless worker. But don't hesitate to ask in the [Discussions](https://github.com/davefojtik/RunPod-Fooocus-API/discussions) if you need more help.

## Contributors Welcomed
Feel free to do pull requests, fixes, improvements and suggestions to the code. I can spend only limited time on this as it's a side project for our community discord bot. So any cooperation will help manage this repo better.