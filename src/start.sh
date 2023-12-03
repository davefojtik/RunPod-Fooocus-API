#!/bin/bash

echo "Worker Initiated"

echo "Starting WebUI API"
cd /workspace
python main.py --sync-repo skip --disable-private-log --skip-pip &

echo "Starting RunPod Handler"
cd /
python -u /handler.py