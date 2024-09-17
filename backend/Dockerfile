FROM node:22-alpine AS build

RUN corepack enable
RUN yarn set version berry

USER node

RUN mkdir /home/node/zdielaj-si-backend/ && chown -R node:node /home/node/zdielaj-si-backend
WORKDIR /home/node/zdielaj-si-backend

COPY --chown=node:node . .
RUN yarn install --immutable
RUN yarn build

FROM node:22-alpine

ENV NODE_ENV production

RUN apk update && apk upgrade --no-cache && \
  corepack enable && \
  yarn set version berry && \
  addgroup --gid 3000 --system juffgroup && \
  adduser  --uid 2000 --system --ingroup juffgroup juffuser && \
  mkdir /home/juffuser/zdielaj-si-backend/

USER 2000:3000

WORKDIR /home/juffuser/zdielaj-si-backend

COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-backend/dist ./dist
COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-backend/node_modules ./node_modules

EXPOSE 3010

CMD [ "node", "dist/index.js" ]
