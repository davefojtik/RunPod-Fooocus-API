> [!CAUTION]
> **My RunPod repos have been archived and won't receive any more work!**  
>     
> Long story short: *There's been an issue with queue delay times that I tried to bring to attention and fix it with the RunPod support team. There are big delays before each container starts, especially before each cold-start (up to 10+ seconds), and they are billed.
> Couple of users and I insisted on them fixing it for more than 2 months. After countless conversations and endless documentation, it got swept away, and I got banned on their Discord server with no explanation.*
>  
> I don't know if the delay is an intentional way to silently charge more money per request, but this whole completely unprofessional approach from their side convinced me to end everything regarding their platform, and I can't simply recommend using their serverless services anymore.
> Here are text copies of the whole [Discord thread](https://pastebin.com/raw/QqLmfN32) and [Email conversations](https://pastebin.com/raw/5LtUvra1) if you want the whole story.
>  
> I'm sorry it had to end like this. Thank you for your understanding and interest in these projects. Shall we see at others again.
___

![github-header](https://github.com/qodeindustries/Quinn-AI/assets/66263283/bf8149b2-cdc3-4a59-96fb-1d272221ef70)
![Static Badge](https://img.shields.io/badge/API_version-0.4.1.0-blue) ![Static Badge](https://img.shields.io/badge/Fooocus_version-2.4.1-blue) ![Static Badge](https://img.shields.io/badge/API_coverage-100%25-vividgreen) ![Static Badge](https://img.shields.io/badge/API_tests-passed-vividgreen)

> [!WARNING]
> Since the main Fooocus project has reached the [end of feature updates](https://github.com/lllyasviel/Fooocus#project-status-limited-long-term-support-lts-with-bug-fixes-only), this repo won't recieve any either,
> although I'll still try to provide support and occasional improvements and optimizations to the RunPod code. Also alternative implementations and interesting projects are in making, so stay tuned!

[Fooocus-API](https://github.com/mrhan1993/Fooocus-API) RunPod serverless worker implementation
___
The repository consists of two branches:
[NetworkVolume](https://github.com/davefojtik/RunPod-Fooocus-API/tree/NetworkVolume) and [Standalone](https://github.com/davefojtik/RunPod-Fooocus-API/tree/Standalone)

The **NetworkVolume** expects you to install and prepare your own instance on the RunPod network volume, or to use our `3wad/runpod-fooocus-api:0.4.1.0-networksetup` to do so. This is ideal if you want to change models, loras or other contents on the fly, let your users upload them, or persist generated image files right on the server. The downside of this solution is slower starts because everything has to be loaded over the data centre's network. See [network-guide](https://github.com/davefojtik/RunPod-Fooocus-API/blob/NetworkVolume/docs/network-guide.md) for step-by-step instructions.

The **Standalone** branch is a ready-to-use docker image with all the files and models already baked and installed into it. You can still customize it to use your own content, but it can't be changed without rebuilding and redeploying the image. This is ideal if you want the fastest, cheapest possible endpoint for long-term usage without the need for frequent changes in its contents. See [standalone-guide](https://github.com/davefojtik/RunPod-Fooocus-API/blob/Standalone/docs/standalone-guide.md) or simply use `3wad/runpod-fooocus-api:0.4.1.0-standalone` as the image for a quick deploy with the default Juggernaut V8 on your RunPod serverless endpoint.

All prebuilt images can be found here: https://hub.docker.com/r/3wad/runpod-fooocus-api

## How to send requests
[request_examples.js](https://github.com/davefojtik/RunPod-Fooocus-API/blob/NetworkVolume/docs/request_examples.js) contain example payloads for all endpoints on your serverless worker, regardless of the branch. But don't hesitate to ask if you need more help.

## Contributors Welcomed
Feel free to make pull requests, fixes, improvements and suggestions to the code. Any cooperation on keeping this repo up-to-date and free of bugs is highly welcomed.

## Updates
We're not always on the latest version automatically, as there can be breaking changes or major bugs. The updates are being made only after thorough tests by our community of Discord users generating images with the AI agent using this repo as its tool. And only if we see that the new version performs better and more stable.
___
> [!NOTE] 
> *This repo is in no way affiliated with RunPod Inc. All logos and names are owned by the authors. This is an unofficial community implementation*
