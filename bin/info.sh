NODE_VER=`node -v`
NPM_VER=`npm -v`
WEBPACK_VER=`/usr/src/app/node_modules/.bin/webpack -v`
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo "================================"

echo "NODE version: $NODE_VER"

echo "NPM version: $NPM_VER"

echo "WEBPACK version: $WEBPACK_VER"

echo "DATAS version: $PACKAGE_VERSION"

echo "================================"
