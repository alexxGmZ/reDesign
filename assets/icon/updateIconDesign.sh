#!/usr/bin/env bash

# reDesign-box
ffmpeg -y -i ./2000/reDesign-box.png -vf "scale=256:256" ./256/box/256x256.png
ffmpeg -y -i ./2000/reDesign-box.png -vf "scale=128:128" ./128/box/128x128.png

# reDesign-circle
ffmpeg -y -i ./2000/reDesign-circle.png -vf "scale=256:256" ./256/circle/256x256.png
ffmpeg -y -i ./2000/reDesign-circle.png -vf "scale=128:128" ./128/circle/128x128.png
