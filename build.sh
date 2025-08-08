#!/bin/sh

ng build @xprng/common
ng build @xprng/markdown
ng build @xprng/code

cp license dist/xprng/common/.
cp license dist/xprng/markdown/.
cp license dist/xprng/code/.
