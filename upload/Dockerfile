FROM node:18-alpine AS build

USER node
RUN mkdir /home/node/zdielaj-si-upload/ && chown -R node:node /home/node/zdielaj-si-upload
WORKDIR /home/node/zdielaj-si-upload

COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:18-alpine

RUN apk add --no-cache ffmpeg

RUN addgroup --gid 3000 --system juffgroup \
  && adduser  --uid 2000 --system --ingroup juffgroup juffuser

USER 2000:3000

RUN mkdir /home/juffuser/zdielaj-si-upload/
WORKDIR /home/juffuser/zdielaj-si-upload

COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-upload/dist ./dist
COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-upload/package.json /home/node/zdielaj-si-upload/yarn.lock ./
RUN yarn install --frozen-lockfile --production

ARG PORT=3010
EXPOSE $PORT

CMD [ "node", "dist/index.js" ]
