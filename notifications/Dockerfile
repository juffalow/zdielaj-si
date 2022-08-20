FROM node:16-alpine AS build

USER node
RUN mkdir /home/node/zdielaj-si-notifications/ && chown -R node:node /home/node/zdielaj-si-notifications
WORKDIR /home/node/zdielaj-si-notifications

COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:16-alpine

RUN addgroup --gid 3000 --system juffgroup \
  && adduser  --uid 2000 --system --ingroup juffgroup juffuser

USER 2000:3000

RUN mkdir /home/juffuser/zdielaj-si-notifications/
WORKDIR /home/juffuser/zdielaj-si-notifications

COPY --from=build /home/node/zdielaj-si-notifications/dist ./dist
COPY --from=build /home/node/zdielaj-si-notifications/package.json /home/node/zdielaj-si-notifications/yarn.lock ./
RUN yarn install --frozen-lockfile --production

EXPOSE 3010

CMD [ "node", "dist/index.js" ]
