# The same Store API

## About

This API is just for practice some concepts:
* Query Builder
* Migrations
* Test
* Evniroments setup

## Setup

### Run migrations

setup the .env as [envoriment].env (enviroment can be develop, test)
```bash
    npx knex:migrate latest --env=[YOUR ENVORIMENT]
```

### Run test

```bash
    npm run test
```

### Develop

```bash
    npm run dev
```

## Routes
### USER

`GET /user/:id`

#### Response
    HTTP/1.1 200 OK \
    Date: Tue, 28 Jun 2022 18:31:40 GMT \
    Connection: keep-alive \
    Status: 200 OK \
    Content-Type: application/json; charset=utf-8 \
    Content-Length: 138 \
    ETag: W/"8a-iTe+5BfhWeVDQ1F8snwZIxlrwkY" \

    {
        "id": 1,
        "name": "Pedro",
        "email": "pedro@email.com",
        "role": "admin",
        "password": "$2b$10$GE.cni1FugGtADKztQdWC.147ox6OcdGUtoFv9Ma6/pg/M9O47t0O"
    }

`POST /user/`

#### Body Schema
    {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "name": {
            "type": "string"
            },
            "email": {
            "type": "string"
            },
            "role": {
            "type": "string"
            },
            "password": {
            "type": "string"
            }
        },
        "required": [
            "name",
            "email",
            "role",
            "password"
        ]
    }

#### Response
    HTTP/1.1 200 OK \
    Date: Tue, 28 Jun 2022 18:31:40 GMT \
    Connection: keep-alive \
    Status: 200 OK \
    Content-Type: application/json; charset=utf-8 \
    Content-Length: 138 \
    ETag: W/"8a-iTe+5BfhWeVDQ1F8snwZIxlrwkY" \

    {
        "id": 2,
        "name": "Pedro",
        "email": "pedro@email.com",
        "role": "admin",
        "password": "$2b$10$cDQYwKx8N0dBaEXn8pZpJuzqKOMmpJdc04DqcPwmnCUn16sYgjsNe"
    }


`PUT /user/:id`

#### Body Schema
    {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "name": {
            "type": "string"
            },
            "email": {
            "type": "string"
            },
            "role": {
            "type": "string"
            },
            "password": {
            "type": "string"
            }
        }
    }

#### Response
    HTTP/1.1 200 OK \
    Date: Tue, 28 Jun 2022 18:31:40 GMT \
    Connection: keep-alive \
    Status: 200 OK \
    Content-Type: application/json; charset=utf-8 \
    Content-Length: 138 \
    ETag: W/"8a-iTe+5BfhWeVDQ1F8snwZIxlrwkY" \

    {
        "id": 2,
        "name": "Pedro",
        "email": "pedro@email.com",
        "role": "admin"
    }

`DELETE /user/:id`

#### Response
    HTTP/1.1 200 OK \
    Date: Tue, 28 Jun 2022 18:31:40 GMT \
    Connection: keep-alive \
    Status: 200 OK \
    Content-Type: application/json; charset=utf-8 \
    Content-Length: 138 \
    ETag: W/"8a-iTe+5BfhWeVDQ1F8snwZIxlrwkY" \

    {
        "id": 2,
        "name": "Pedro",
        "email": "pedro@email.com",
        "role": "admin"
    }

### AUTH

`POST /auth/`

#### Body Schema
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    }
  },
  "required": [
    "email",
    "password"
  ]
#### Response
    HTTP/1.1 200 OK \
    Date: Tue, 28 Jun 2022 18:31:40 GMT \
    Connection: keep-alive \
    Status: 200 OK \
    Content-Type: application/json; charset=utf-8 \
    Content-Length: 138 \
    ETag: W/"8a-iTe+5BfhWeVDQ1F8snwZIxlrwkY" \

    {
        "token": "admin"
    }


### STORE

`POST /store/` \
Auth required token in bearer token

#### Body Schema
    {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "name": {
        "type": "string"
        },
        "address": {
        "type": "string"
        }
    },
    "required": [
        "name",
        "address"
    ]
    }