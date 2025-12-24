#!/bin/bash

projects=(vendor common markdown code slides query)

for project in "${projects[@]}"; do
  ng build "@xprng/$project"
done

for project in "${projects[@]}"; do
  cp license "dist/xprng/$project/"
done
