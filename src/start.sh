#!/bin/bash

echo "Worker Initiated"

# Output clearing has been moved to the python code, as here it was skipped (cached) with the RunPod Flashboot

echo "Starting Fooocus API"
cd /workspace
python main.py --sync-repo skip --skip-pip --disable-image-log --preview-option none --disable-in-browser & # You can add more Fooocus flags here to optimize performance for your workers, see https://github.com/lllyasviel/Fooocus?tab=readme-ov-file#all-cmd-flags

echo "Starting RunPod Handler"
cd /
python -u /handler.py