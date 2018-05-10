docker run -d \
	-p 3000:3000 \
	-p 4430:4430 \
	-p 9001:9001 \
	--env-file .env-dev \
	$(cat latest.txt) > current_container_id.txt
cat current_container_id.txt | awk '{print $1}' | cut -c-12
sleep 1
docker logs -f $(cat current_container_id.txt)
