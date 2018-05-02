export $(cat .env | grep -v ^# | xargs)
echo "building..."
echo $NODE_ENV
