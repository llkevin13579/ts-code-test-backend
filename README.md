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
npm run 
```

# Running Service In the Server
It's better to run with Docker container.

## Build Docker Image
```
docker build -f Dockerfile.ENV_NAME -t ts-code-test-backend:latest .
```

## Run Docker Container
``` 
docker run --rm --name ts-code-test-backend -p 3000:3000 ts-code-test-backend:latest
```
