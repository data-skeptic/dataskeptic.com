docker run -d \
	-e AUTH_SALT=$(cat creds.txt | awk '{print $1}') \
	-e EMAILS_ADMIN=$(cat creds.txt | awk '{print $2}') \
    -e ELASTIC_SEARCH_ENDPOINT=$(cat creds.txt | awk '{print $3}') \
    -e CAREERS_EMAIL_ADMIN=$(cat creds.txt | awk '{print $4}') \
    -e CAREERS_FILES_BUCKET=$(cat creds.txt | awk '{print $5}') \
	-e FILES_FOLDER==$(cat creds.txt | awk '{print $6}') \
	-e FILES_SITE_BUCKET=$(cat creds.txt | awk '{print $7}') \
    -e IPINFO_TOKEN=$(cat creds.txt | awk '{print $8}') \
    -e INFLUXDB_HOST=$(cat creds.txt | awk '{print $9}') \
    -e INFLUXDB_DATABASE=$(cat creds.txt | awk '{print $10}') \
    -e INFLUXDB_PORT=$(cat creds.txt | awk '{print $11}') \
	-e INFLUXDB_USER=$(cat creds.txt | awk '{print $12}') \
    -e INFLUXDB_PASSWORD=$(cat creds.txt | awk '{print $13}') \
    -e BASE_API=$(cat creds.txt | awk '{print $14}') \
    -e PRINTFUL_API=$(cat creds.txt | awk '{print $15}') \
    -e PRINTFUL_ROOT=$(cat creds.txt | awk '{print $16}') \
	-e CHALLENGE=$(cat creds.txt | awk '{print $17}') \
    -e CHAT_LOGS=$(cat creds.txt | awk '{print $18}') \
    -e BOT_EMBED_CODE=$(cat creds.txt | awk '{print $19}') \
    -e STRIPE=$(cat creds.txt | awk '{print $20}') \
    -e STRIPE_PUBLISHABLE=$(cat creds.txt | awk '{print $21}') \
	-e SP=$(cat creds.txt | awk '{print $22}') \
    -e SLACK=$(cat creds.txt | awk '{print $23}') \
    -e LINKEDIN_CLIENT_ID=$(cat creds.txt | awk '{print $24}') \
    -e LINKEDIN_CLIENT_SECRET=$(cat creds.txt | awk '{print $25}') \
    -e LINKEDIN_CLIENT_CALLBACK_URL=$(cat creds.txt | awk '{print $26}') \
	-e GOOGLE_CLIENT_ID=$(cat creds.txt | awk '{print $27}') \
    -e GOOGLE_CLIENT_SECRET=$(cat creds.txt | awk '{print $28}') \
    -e PLAYER_METADATA_USERS=$(cat creds.txt | awk '{print $29}') \
    -e PLAYER_METADATA=$(cat creds.txt | awk '{print $30}') \
    -e AWS_ACCESS_KEY_ID=$(cat creds.txt | awk '{print $31}') \
	-e AWS_SECRET_ACCESS_KEY=$(cat creds.txt | awk '{print $32}') \
    -e AWS_REGION=$(cat creds.txt | awk '{print $33}') \
    -e RECORDING_SOURCE=$(cat creds.txt | awk '{print $34}') \
    -e RECORDING_AWS_PROPOSALS_BUCKET=$(cat creds.txt | awk '{print $35}') \
    -e RECORDING_AWS_FILES_BUCKET=$(cat creds.txt | awk '{print $36}') \
	-e PROPOSALS_TABLE=$(cat creds.txt | awk '{print $37}') \
    -e RECORDING_LOCKED_FILE_NAME=$(cat creds.txt | awk '{print $38}') \
    -e RECORDING_TEMP_FILES=$(cat creds.txt | awk '{print $39}') \
    -e RECORDING_EMAILS_ADMIN=$(cat creds.txt | awk '{print $40}') \
    $(cat latest.txt) > container_id.txt
