FROM node:alpine

RUN apk add --update python make gcc musl-dev g++

RUN mkdir /appdata && chown -R node /appdata
WORKDIR /appdata
USER node

COPY --chown=node:node ./package.json ./
RUN npm install

COPY --chown=node:node ./ ./

CMD ["npm","start"]