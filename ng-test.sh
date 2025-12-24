#!/bin/bash

projects=(common markdown code slides)

for project in "${projects[@]}"; do
  ng test --watch false "@xprng/$project"
done
