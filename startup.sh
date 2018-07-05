echo "running startup.sh"
cd /usr/src/app/
if [ -n $NODE_ENV ]
then
  if [ $NODE_ENV == "dev" ]
  then
    echo "Starting in DEV mode"
    npm run dev
    exit
 else
    echo "Starting in PROD mode"
    npm run start
    exit
  fi
else
  echo -e "NODE_ENV not set.\n"
fi
