FROM node:slim as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src
COPY .env ./.env

ENTRYPOINT [ "npm", "run", "dev" ]
