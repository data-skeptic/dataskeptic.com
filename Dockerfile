FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y sudo
RUN apt-get install -y nano
RUN apt-get install -y wget
RUN apt-get install -y curl
RUN apt-get install -y zip

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

RUN wget https://github.com/data-skeptic/dataskeptic.com/archive/master.zip
RUN unzip master.zip
RUN cd dataskeptic.com-master/; npm install
#RUN cd dataskeptic.com-master/; npm run dev