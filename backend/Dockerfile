FROM node:20-alpine AS build

RUN corepack enable
RUN yarn set version berry

USER node

RUN mkdir /home/node/zdielaj-si-backend/ && chown -R node:node /home/node/zdielaj-si-backend
WORKDIR /home/node/zdielaj-si-backend

COPY --chown=node:node . .
RUN yarn install --immutable && yarn build

FROM node:20-alpine

ENV NODE_ENV production

RUN apk update && apk upgrade --no-cache

RUN corepack enable
RUN yarn set version berry

RUN addgroup --gid 3000 --system juffgroup \
  && adduser  --uid 2000 --system --ingroup juffgroup juffuser

USER 2000:3000

RUN mkdir /home/juffuser/zdielaj-si-backend/
WORKDIR /home/juffuser/zdielaj-si-backend

COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-backend/dist ./dist
COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-backend/package.json /home/node/zdielaj-si-backend/yarn.lock /home/node/zdielaj-si-backend/.yarnrc.yml ./

RUN yarn install --immutable

EXPOSE 3010

CMD [ "node", "dist/index.js" ]
