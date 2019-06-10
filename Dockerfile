FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN npm install -g http-server

COPY dist/ ./dist

CMD http-server ./dist/my-app -p 4200 -a 0.0.0.0
