FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

#RUN apt-get update
#RUN apt-get install -y sudo
#RUN apt-get install -y nano
#RUN apt-get install -y wget
#RUN apt-get install -y curl
#RUN apt-get install -y zip

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 443 80 3000

CMD ["npm", "run", "docker_start"]

# docker run -i -t -p 443:443 -p 80:80 -p 3000:3000 -v /Users/kylepolich/git/dataskeptic.com/config/:/usr/src/app/config/ kylepolich/dataskeptic.com
