#!/usr/bin/env bash

declare -A resolutions=(
  ["256"]="256"
  ["128"]="128"
  ["32"]="32"
)

images=("reDesign-box" "reDesign-circle")

for image in "${images[@]}"; do
  for res in "${!resolutions[@]}"; do
    ffmpeg -y -i "./2000/${image}.png" -vf "scale=${res}:${res}" "./${resolutions[$res]}/${image}/${res}x${res}.png"
  done
done
