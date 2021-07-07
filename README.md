# Zdielaj si

Sluzba na zdielanie fotiek v plnej kvalite.

## Co potrebuje

* S3 bucket (alebo cokolvek co implementuje ich API, napr. DigitalOcean Spaces)
* databazu, kde sa budu ukladat data o albumoch a fotkach

## Ako spustit projekt

Projekt sa sklada z dvoch separatnych projektov - backend a frontend. Pri oboch treba vytvorit subor `config.ts`, kde su napr. pristupy do databazy, S3 bucket pristupy alebo URL adresa na API a nainstalovat npm balicky.

Ukazka z `backend/config.example.ts`:

```ts
  database: {
    connection: {
      database : process.env.DATABASE_NAME || '',
      host : process.env.DATABASE_HOST || '',
      password : process.env.DATABASE_PASSWORD || '',
      user : process.env.DATABASE_USER || '',
      port : process.env.DATABASE_PORT || 3306,
    },
    runMigrations: true,
  },
```

Instalacia npm balickov:

```shell
# backend
cd ./backend
yarn install

# frontend
cd ./frontend
yarn install
```

V oboch pripadoch sa potom spustaju pomocou prikazu `start`:

```shell
# backend
yarn start

# frontend
yarn start
```

## License

[MIT license](./LICENSE)
