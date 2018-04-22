FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --loglevel=verbose

COPY . /usr/src/app

EXPOSE 443 80 9001

CMD ["npm", "run", "start"]
