FROM node:alpine

RUN mkdir /appdata && chown -R node /appdata
WORKDIR /appdata
USER node

COPY --chown=node:node ./package.json ./
RUN npm install

COPY --chown=node:node ./ ./

RUN npm run build

RUN ls /appdata/build


FROM tiangolo/nginx-rtmp:latest

COPY --from=0 /appdata/build /streamer-frontend
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /streamdata/hls