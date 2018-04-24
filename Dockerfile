FROM node:9-alpine

WORKDIR /app

ARG DEBUG
ARG NPM_TOKEN

COPY . .

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        git \
    && echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc \
    && npm install \
    && rm ~/.npmrc \
    && apk del .gyp

CMD DEBUG=$DEBUG npm start
