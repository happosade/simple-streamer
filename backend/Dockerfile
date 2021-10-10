FROM node:alpine

RUN apk add --update python3 make gcc musl-dev g++ && \
    ln -sf python3 /usr/bin/python

RUN mkdir /appdata && chown -R node /appdata
WORKDIR /appdata
USER node

COPY --chown=node:node ./package.json ./
RUN npm install

COPY --chown=node:node ./ ./

CMD ["npm","start"]