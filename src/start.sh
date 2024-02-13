#!/bin/bash
echo "Worker Initiated"

echo "Starting Fooocus API"
cd /workspace
python main.py --sync-repo skip --skip-pip --disable-image-log --queue-history 1 --preview-option none --disable-in-browser & # You can add more Fooocus flags here to optimize performance for your workers, see https://github.com/lllyasviel/Fooocus?tab=readme-ov-file#all-cmd-flags

echo "Starting RunPod Handler"
cd /
python -u /handler.py