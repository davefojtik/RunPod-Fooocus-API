## How to use standalone image
- [**Create RunPod serverless endpoint:**](https://www.runpod.io/console/serverless) use `3wad/runpod-fooocus-api:0.3.30-standalone` and 20GB disk size
- Other settings are your choice, but I personally found that using 4090/L4 GPUs + Flashboot is the most cost-effective one.
- That's it! See the [request_examples]() for how to make requests to this endpoint from your app.

## How to customize standalone image
To modify default settings and used model, see [config.txt](https://github.com/davefojtik/RunPod-Fooocus-API/Standalone/src/config.txt) and [default.json](https://github.com/davefojtik/RunPod-Fooocus-API/Standalone/src/default.json)  
To modify which models and files are being baked into the image, see [Dockerfile](https://github.com/davefojtik/RunPod-Fooocus-API/Standalone/Dockerfile)