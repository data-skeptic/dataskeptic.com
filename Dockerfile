FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN apk add --no-cache nodejs-current tini

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Copy dependencies file
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install --save-dev -g babel-cli

## Copy app sources
COPY . /usr/src/app

RUN rm -rf /usr/src/app/node_modules

## Specify NPM version
RUN npm i -g npm@5.6.0

## Install app dependencies
RUN npm install --loglevel=verbose

COPY startup.sh /
RUN ./bin/info.sh

## TODO remove all config/env files in terms of security
RUN rm -rf /usr/src/app/.env

RUN npm run-script build

## Expose used ports
EXPOSE 80 443 4430 3000 9001

## Run
CMD ["/bin/sh", "-c", "/usr/src/app/startup.sh"]
