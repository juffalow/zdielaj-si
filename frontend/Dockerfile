FROM node:20-alpine as build

RUN mkdir /home/node/zdielaj-si-frontend/ && chown -R node:node /home/node/zdielaj-si-frontend
WORKDIR /home/node/zdielaj-si-frontend
COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM nginx:stable-alpine

RUN addgroup --gid 3000 --system juffgroup \
  && adduser  --uid 2000 --system --ingroup juffgroup juffuser

RUN chown -R juffuser:juffgroup /etc/nginx/conf.d
RUN chown -R juffuser:juffgroup /var/log/nginx
RUN chown -R juffuser:juffgroup /var/cache/nginx
RUN chown -R juffuser:juffgroup /usr/share/nginx

RUN touch /var/run/nginx.pid && \
        chown -R juffuser:juffgroup /var/run/nginx.pid

USER 2000:3000

COPY --from=build /home/node/zdielaj-si-frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

RUN echo $'\n\
server {\n\
  listen 8080;\n\
  root   /usr/share/nginx/html;\n\
  \n\
  gzip on;\n\
  gzip_vary on;\n\
  gzip_min_length 1024;\n\
  gzip_proxied expired no-cache no-store private auth;\n\
  gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml;\n\
  gzip_disable "MSIE [1-6]\.";\n\
  \n\
  location / {\n\
    index  index.html index.htm;\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
  error_page   500 502 503 504  /50x.html;\n\
  location = /50x.html {\n\
    root   /usr/share/nginx/html;\n\
  }\n\
  location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {\n\
    expires 30d;\n\
    access_log off;\n\
    add_header Cache-Control "public";\n\
  }\n\
  location ~* \.(?:css|js)$ {\n\
    expires 7d;\n\
    access_log off;\n\
    add_header Cache-Control "public";\n\
  }\n\
}\n\
' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
