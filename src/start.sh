#!/bin/bash

echo "Worker Initiated"

# Comment/Uncomment this part to clear outputs folder on each run
echo "Clearing outputs"
rm -rf /workspace/outputs/files/*

echo "Starting WebUI API"
cd /workspace
python main.py --sync-repo skip --disable-private-log --skip-pip &

echo "Starting RunPod Handler"
cd /
python -u /handler.py
