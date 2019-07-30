FROM node:12.7.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g http-server

# add app
COPY . /app
RUN npm install typescript@'>=2.7.2 <2.8.0'

RUN ng build --prod
RUN ls

RUN chmod 777 start.sh
CMD "./start.sh"