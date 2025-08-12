#!/bin/sh

ng build @xprng/vendor
ng build @xprng/common
ng build @xprng/markdown
ng build @xprng/code
ng build @xprng/slides

cp license dist/xprng/vendor/.
cp license dist/xprng/common/.
cp license dist/xprng/markdown/.
cp license dist/xprng/code/.
cp license dist/xprng/slides/.
