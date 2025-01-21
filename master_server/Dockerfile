FROM node:slim AS builder

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY src ./src
COPY .env ./.env

ENTRYPOINT [ "npm", "run", "dev" ]
