#!/bin/bash

echo "Worker Initiated"

# Comment/Uncomment this part to clear outputs folder on each run
echo "Clearing outputs"
rm -rf /workspace/outputs/files/*

echo "Starting Fooocus API"
cd /workspace
python main.py --sync-repo skip --skip-pip --disable-image-log --preview-option none & # You can add more Fooocus flags here to optimize performance for your workers, see https://github.com/lllyasviel/Fooocus?tab=readme-ov-file#all-cmd-flags

echo "Starting RunPod Handler"
cd /
python -u /handler.py