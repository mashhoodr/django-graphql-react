FROM node:14.1-alpine

RUN mkdir /app

WORKDIR /app

COPY ./app/package.json /app/package.json

RUN yarn install

EXPOSE 3000

CMD yarn start
