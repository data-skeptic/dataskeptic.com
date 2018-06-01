#!/bin/bash
function parse_git_dirty() {
  git diff --quiet --ignore-submodules HEAD 2>/dev/null; [ $? -eq 1 ]
}

# gets the current git branch
function parse_git_branch() {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"
}

# get last commit hash prepended with @ (i.e. @8a323d0)
function parse_git_hash() {
  git rev-parse --short HEAD 2> /dev/null
}

GIT_BRANCH=$(parse_git_branch)_$(parse_git_hash)

VERSION=$(date +"%Y%m%d").git.$GIT_BRANCH
IMAGE=dataskeptic/dataskeptic.com
echo $IMAGE:$VERSION > latest.txt
echo $IMAGE:$VERSION

echo "building image"
export $(cat .env | grep -v ^# | xargs)
echo "variables injected"
docker build --build-arg NODE_ENV=$NODE_ENV \
	--build-arg HOST=$HOST --build-arg PORT=$PORT --build-arg HTTPS_PORT=$HTTPS_PORT \
	--build-arg BASE_URL=$BASE_URL --build-arg SITE_BUCKET=$SITE_BUCKET \
	--build-arg IPINFO_TOKEN=$IPINFO_TOKEN --build-arg BASE_API=$BASE_API \
	--build-arg ELASTIC_SEARCH_ENDPOINT=$ELASTIC_SEARCH_ENDPOINT \
	--build-arg STRIPE=$STRIPE --build-arg SP=$SP --build-arg SLACK=$SLACK \
	--build-arg ITUNES=$ITUNES --build-arg TEMP_FILES=$TEMP_FILES \
	--build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
	--build-arg AWS_REGION=$AWS_REGION --build-arg AWS_CONFIG_S3_BUCKET=$AWS_CONFIG_S3_BUCKET \
	--build-arg AWS_CONFIG_S3_KEY=$AWS_CONFIG_S3_KEY --build-arg RECORDING_SOURCE=$RECORDING_SOURCE \
	--build-arg RECORDING_AWS_PROPOSALS_BUCKET=$RECORDING_AWS_PROPOSALS_BUCKET \
	--build-arg RECORDING_AWS_FILES_BUCKET=$RECORDING_AWS_FILES_BUCKET \
	--build-arg RECORDING_LOCKED_FILE_NAME=$RECORDING_LOCKED_FILE_NAME --build-arg RECORDING_TEMP_FILES=$RECORDING_TEMP_FILES \
	--build-arg RECORDING_EMAILS_ADMIN=$RECORDING_EMAILS_ADMIN --build-arg INFLUXDB_ON=$INFLUXDB_ON \
	--build-arg INFLUXDB_HOST=$INFLUXDB_HOST --build-arg INFLUXDB_DATABASE=$INFLUXDB_DATABASE \
	--build-arg INFLUXDB_PORT=$INFLUXDB_PORT --build-arg INFLUXDB_USER=$INFLUXDB_USER \
	--build-arg INFLUXDB_PASSWORD=$INFLUXDB_PASSWORD --build-arg AUTH_SALT=$AUTH_SALT \
	--build-arg AUTH_LINKEDIN_ON=$AUTH_LINKEDIN_ON --build-arg AUTH_LINKEDIN_CLIENT_ID=$AUTH_LINKEDIN_CLIENT_ID \
	--build-arg AUTH_LINKEDIN_CLIENT_SECRET=$AUTH_LINKEDIN_CLIENT_SECRET \
	--build-arg AUTH_LINKEDIN_CLIENT_CALLBACK_URL=$AUTH_LINKEDIN_CLIENT_CALLBACK_URL \
	--build-arg AUTH_GOOGLE_ON=$AUTH_GOOGLE_ON --build-arg AUTH_GOOGLE_CLIENT_ID=$AUTH_GOOGLE_CLIENT_ID \
	--build-arg AUTH_GOOGLE_CLIENT_SECRET=$AUTH_GOOGLE_CLIENT_SECRET \
	--build-arg AUTH_GOOGLE_CLIENT_CALLBACK_URL=$AUTH_GOOGLE_CLIENT_CALLBACK_URL \
	--build-arg PLAYER_METADATA=$PLAYER_METADATA --build-arg CHAT_LOGS=$CHAT_LOGS \
	--build-arg CAREERS_EMAIL_ADMIN=$CAREERS_EMAIL_ADMIN --build-arg CAREERS_FILES_BUCKET=$CAREERS_FILES_BUCKET \
	-t $(cat latest.txt) .


echo "push image to heroku"
docker tag $(cat latest.txt) registry.heroku.com/dataskeptic-dev/web
docker push registry.heroku.com/dataskeptic-dev/web
echo "finishing push, open page now"
heroku open --app dataskeptic-dev
