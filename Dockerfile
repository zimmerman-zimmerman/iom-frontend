FROM node:9.11
LABEL type = iom-frontend(dev)

RUN npm -g install yarn


WORKDIR /app/src
ENV PATH /app/src/node_modules/.bin:${PATH}

ADD package.json /app/src
ADD yarn.lock /app/src

RUN yarn install

ADD . /app/src/

RUN npm run build

CMD /app/src/bin/docker-cmd.sh
