## How to prepare Network Volume
- [**Create RunPod network volume:**](https://www.runpod.io/console/user/storage)
  20GB is just enough for the generic Foocus with Juggernaut and **all** controlnet models (you can save some space by not downloading those you don't plan to use - by modifying the [script](https://github.com/davefojtik/RunPod-Fooocus-API/NetworkVolume/src/networksetup.sh) and making your own setup image). You can increase its size any time if you need additional models, loras etc. But unfortunately, it cannot be reduced back without creating a new one.
- [**Create a custom CPU Pod Template:**](https://www.runpod.io/console/user/templates) use the `3wad/runpod-fooocus-api:v0.3.30-networksetup` image,  20GB disk size and mount path `/workspace`.
- [**Run a CPU pod:**](https://www.runpod.io/console/pods) with **network volume** and runpod-fooocus-api template you've just created. Any CPU pod will do, the installation is just download-intensive. After a while, you should see a "Setup complete!" message in Pod logs. After that, you can move to the serverless setup steps. 
---
- Now you can use our premade image: `3wad/runpod-fooocus-api:0.3.30-networkendpoint` and skip the next step OR create your custom docker image from this repo that will run on the actual serverless API. Feel free to adjust the code to your needs.
- *If you built your own image, upload it to the Docker Hub.*
- [**Create a custom Serverless Pod Template:**](https://www.runpod.io/console/user/templates) using the Docker Hub image you've just uploaded (or our premade one).
- [**Create a new Serverless API Endpoint:**](https://www.runpod.io/console/serverless) Make sure to choose your (or our) Docker Hub image and not the `3wad/runpod-fooocus-api:v0.3.30-networksetup` from the step 2. In Advanced settings choose your created network volume.
- Other settings are your choice, but I personally found that using 4090/L4 GPUs + Flashboot is the most cost-effective one.
- That's it! See the [request_examples]() for how to make requests to this endpoint from your app.
