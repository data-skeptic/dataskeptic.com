FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Copy dependencies file
COPY package.json /usr/src/app/

# Expose variables
COPY .env /usr/src/app/
COPY webpack_env.sh /usr/src/app/
RUN chmod +x webpack_env.sh
RUN ./webpack_env.sh

## Install app dependencies
RUN npm install --loglevel=verbose

## Copy app sources
COPY . /usr/src/app

RUN npm run-script build

## Expose used ports
EXPOSE 4430 3000 3000 9001

## TODO remove all config/env files in terms of security

## Run
CMD ["npm", "run", "start"]
