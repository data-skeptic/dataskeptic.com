echo "Going to make and tag as ---> $1 <----"
git pull
read -p "Press enter to continue"
npm i
read -p "Press enter to continue"
#npm run build
read -p "Press enter to continue"
docker build -t $1 .
read -p "Press enter to continue"
docker kill $(docker ps | grep -v "CONTAINER ID" | awk '{print $1}')
docker run -i -t -d -p 443:443 -p 80:80 -p 9001:9001 $1
docker logs -f $(docker ps | grep -v "CONTAINER ID" | awk '{print $1}')

