FROM node:20-alpine as build

USER node
RUN mkdir /home/node/zdielaj-si-frontend/ && chown -R node:node /home/node/zdielaj-si-frontend
WORKDIR /home/node/zdielaj-si-frontend

COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:20-alpine

RUN addgroup --gid 3000 --system juffgroup \
  && adduser  --uid 2000 --system --ingroup juffgroup juffuser

USER 2000:3000

RUN mkdir /home/juffuser/zdielaj-si-frontend/
WORKDIR /home/juffuser/zdielaj-si-frontend

ENV NODE_ENV=production
ENV PORT=3000

COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-frontend/.next/standalone ./
COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-frontend/public ./public
COPY --chown=juffuser:juffgroup --from=build /home/node/zdielaj-si-frontend/.next/static ./.next/static

EXPOSE 3000

CMD [ "node", "server.js" ]
