# Introduction
Create an end-to-end web application that allows the user to read, create and delete a to-do list of duties of any kind. This project is for backend.

# Prerequisites
(1) Please make sure [Docker]([https://www.docker.com/]) has already installed in your computer. 

(2) [Node.js](https://nodejs.org/en)(Version>=16) is install on your operating system.

# Init Database and Table
## Setup Database
We use PostgreSQL as database. You could use Docker to host it locally.

```
docker run --rm \
    --name postgres \
    -e POSTGRES_PASSWORD=Password \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=postgres \
    -p 5432:5432 \
    -v pgdb-vol:/var/lib/postgresql/data \
    postgres
```

Alternatively, you could install it locally through the PostgreSQL official document. Or use the cloud database service directly.

>Note: If you use the cloud database service directly, please update the ``.env`` of root folder config for database first.

## Setup Table
Execute the sql in ``/sql/initDb.sql``.

# Install Dependencies
```
npm install
```
Or
```
yarn
```

# Running Service Locally
Running without hot reload:
```
npm run start
```

Running with hot reload:
```
npm run start:dev
```

Running in debug mode:
```
npm run start:debug
```

Running other environment locally:

Update the database config in ``.env.qa`` or ``.env.preprod`` and then run the following command:
```
npm run build
npm run start:qa / npm run start:preprod
```
> Due to the security issue, it's not recommended to run production in local. If you want to run production service, please refer to the next section of the document.

# Running Service In the Server
It's better to run with Docker container for non-local environment.

## Build Docker Image
```
docker build -f Dockerfile.ENV_NAME -t ts-code-test-backend:latest .
```

## Run Docker Container
``` 
docker run --rm \
    --name ts-code-test-backend \
    -p 3000:3000 \
    -e PG_HOST=PROD_HOST \
    -e PG_PORT=PROD_PORT \
    -e PG_DATABASE=PROD_DATABASE \
    -e PG_USERNAME=PROD_USERNAME \
    -e PG_PASSWORD=PROd_PASSWORD \
    -d \
    ts-code-test-backend:latest
```

# Lint
If you want to run lint checker, please run the following command:

```
npm run lint
```

> The linter also integrated with [husky](https://www.npmjs.com/package/husky) lib. It will check before you commit code.

# Unit Test
If you want to run unit test with [jest](https://jestjs.io/), please run the following command:

```
npm run test
```

Running with coverage report. 

The result will generate to ``/coverage`` folder and then you could check the report in ``/coverage/lcov-report/index.html``
```
npm run test:cov
```

Running with watch mode
```
npm run test:watch
```

Running with debug mode
```
npm run test:debug
```

# API Specification
If you want to check Swagger API spec, please visit ``/api`` in your browser after running the project.
