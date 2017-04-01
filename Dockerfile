# dataskeptic.com

FROM ubuntu:16.04
MAINTAINER Kyle Polich "kyle@dataskeptic.com"
RUN apt-get update -y
RUN apt-get install -y sudo
RUN apt-get install -y nano
RUN apt-get install -y wget
RUN apt-get install -y curl
RUN apt-get install -y zip
RUN apt-get install -y ffmpeg

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

COPY . /app
WORKDIR /app

RUN cd app; npm install

ENTRYPOINT["npm"]
CMD["run start"]

#awsconfig.json
#config.json
