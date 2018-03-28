#git pull
#npm i
#npm run build
#docker build -t kylepolich/dataskeptic.com .
#docker tag kylepolich/dataskeptic.com kylepolich/dataskeptic.com:2
#tail -1 Dockerfile

docker kill $(docker ps | grep -v "CONTAINER ID" | awk '{print $1}')
docker run -i -t -d -p 443:443 -p 80:80 -p 9001:9001 ds75
docker logs -f $(docker ps | grep -v "CONTAINER ID" | awk '{print $1}')

