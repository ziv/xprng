#!/bin/sh

ng build @xprng/vendor
ng build @xprng/common
ng build @xprng/markdown
ng build @xprng/highlight

cp license dist/xprng/vendor/.
cp license dist/xprng/common/.
cp license dist/xprng/markdown/.
cp license dist/xprng/highlight/.
