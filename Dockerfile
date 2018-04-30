FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --loglevel=verbose


COPY . /usr/src/app

RUN npm run-script build

EXPOSE 4430 3000 9001

CMD ["npm", "run", "start"]
