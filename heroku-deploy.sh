#!/bin/bash
chmod 700 build-local.sh
echo "building image"
./build-local.sh
echo "push image to heroku"
docker tag dataskeptic registry.heroku.com/dataskeptic-com/web
docker push registry.heroku.com/dataskeptic-com/web
echo "finishing push, open page now"
heroku open --app dataskeptic-com