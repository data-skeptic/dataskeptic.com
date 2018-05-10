docker run -d \
	-p 80:80 \
	-p 443:443 \
	-p 9001:9001 \
	--env-file .env \
	$(cat latest.txt) > current_container_id.txt
cat current_container_id.txt | awk '{print $1}' | cut -c-12
sleep 1
docker logs -f $(cat current_container_id.txt)
