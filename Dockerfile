FROM mhart/alpine-node:latest

LABEL maintainer="Kyle Polich"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 443 80 3000 9001

CMD ["npm", "run", "dev"]

# docker build -t dataskeptic.com .
# docker run -i -t -d -p 443:443 -p 80:80 -p 3000:3000 -p 9001:9001 dataskeptic.com
