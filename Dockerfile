FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Copy dependencies file
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

## Specify NPM version
RUN npm i -g npm@5.6.0

## Install app dependencies
RUN npm install --loglevel=verbose

## Copy app sources
COPY . /usr/src/app

RUN npm run-script build

## Expose used ports
EXPOSE 80 443 4430 3000 9001

## TODO remove all config/env files in terms of security

## Run
CMD ["npm", "run", "start"]
