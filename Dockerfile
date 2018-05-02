FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Copy dependencies file
COPY package.json /usr/src/app/

# Expose variables
COPY .env /usr/src/app/
COPY build_env.sh /usr/src/app/
RUN chmod +x build_env.sh
RUN ./build_env.sh

## Install app dependencies
RUN npm install --loglevel=verbose

## Copy app sources
COPY . /usr/src/app

RUN npm run-script build

## Expose used ports
EXPOSE 4430 4000 3000 9001

## Run
CMD ["npm", "run", "start"]
