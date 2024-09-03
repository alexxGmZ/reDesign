#!/usr/bin/env bash

# reDesign-box
ffmpeg -y -i ./2000/reDesign-box.png -vf "scale=256:256" ./256/reDesign-box.png
ffmpeg -y -i ./2000/reDesign-box.png -vf "scale=128:128" ./128/reDesign-box.png

# reDesign-circle
ffmpeg -y -i ./2000/reDesign-circle.png -vf "scale=256:256" ./256/reDesign-circle.png
ffmpeg -y -i ./2000/reDesign-circle.png -vf "scale=128:128" ./128/reDesign-circle.png
