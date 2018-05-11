docker ps
docker kill $(docker ps | grep dataskeptic | awk '{print $1}')
echo "========================================================================"
docker ps
