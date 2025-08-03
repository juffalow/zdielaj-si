# ------------------------------------------------------------
# Development dependencies that are used to build the application
# ------------------------------------------------------------

  FROM node:22-alpine AS development-dependencies-env
  USER node
  RUN mkdir /home/node/application/ && chown -R node:node /home/node/application
  WORKDIR /home/node/application
  COPY --chown=node:node . .
  RUN npm ci
  
  # ------------------------------------------------------------
  # Production dependencies that are copied to the final image
  # ------------------------------------------------------------
  
  FROM node:22-alpine AS production-dependencies-env
  USER node
  RUN mkdir /home/node/application/ && chown -R node:node /home/node/application
  WORKDIR /home/node/application
  COPY --chown=node:node . .
  RUN npm ci --omit=dev
  
  # ------------------------------------------------------------
  
  FROM node:22-alpine AS build-env
  USER node
  RUN mkdir /home/node/application/ && chown -R node:node /home/node/application
  WORKDIR /home/node/application
  COPY --chown=node:node . .
  COPY --from=development-dependencies-env /home/node/application/node_modules /home/node/application/node_modules
  RUN npm run build
  
  # ------------------------------------------------------------
  
  FROM node:22-alpine
  
  ENV NODE_ENV="production"
  
  RUN apk update && apk upgrade --no-cache && \
    addgroup --gid 3000 --system zdielaj-si-group && \
    adduser  --uid 2000 --system --ingroup zdielaj-si-group zdielaj-si && \
    mkdir /home/zdielaj-si/application/
  
  COPY --chown=zdielaj-si:zdielaj-si-group ./package.json package-lock.json /home/zdielaj-si/application/
  COPY --chown=zdielaj-si:zdielaj-si-group --from=production-dependencies-env /home/node/application/node_modules /home/zdielaj-si/application/node_modules
  COPY --chown=zdielaj-si:zdielaj-si-group --from=build-env /home/node/application/build /home/zdielaj-si/application/build
  WORKDIR /home/zdielaj-si/application/
  
  USER zdielaj-si
  
  EXPOSE 3000
  
  CMD ["npm", "run", "start"]
  