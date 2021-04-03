# Zdielaj si

Sluzba na zdielanie obrazkov v plnej kvalite.

## Build frontend

```shell
docker build -t juffalow/zdielaj-si-frontend .

docker tag juffalow/zdielaj-si-frontend registry.digitalocean.com/juffalow/zdielaj-si-frontend:1.2.0

docker push registry.digitalocean.com/juffalow/zdielaj-si-frontend:1.2.0
```

## Build backend

```shell
docker build -t juffalow/zdielaj-si-backend .

docker tag juffalow/zdielaj-si-backend registry.digitalocean.com/juffalow/zdielaj-si-backend:1.2.0

docker push registry.digitalocean.com/juffalow/zdielaj-si-backend:1.2.0
```

## License

[MIT license](./LICENSE)
