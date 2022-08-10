FROM node:16-alpine3.12 AS build

USER node
RUN mkdir /home/node/zdielaj-si-upload/ && chown -R node:node /home/node/zdielaj-si-upload
WORKDIR /home/node/zdielaj-si-upload

COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:16-alpine3.12

RUN apk add --no-cache ffmpeg

RUN addgroup --gid 3000 --system juffgroup \
  && adduser  --uid 2000 --system --ingroup juffgroup juffuser

USER 2000:3000

RUN mkdir /home/juffuser/zdielaj-si-upload/
WORKDIR /home/juffuser/zdielaj-si-upload

COPY --from=build /home/node/zdielaj-si-upload/dist ./dist
COPY --from=build /home/node/zdielaj-si-upload/package.json /home/node/zdielaj-si-upload/yarn.lock ./
RUN yarn install --frozen-lockfile --production

EXPOSE 3010

CMD [ "node", "dist/index.js" ]
