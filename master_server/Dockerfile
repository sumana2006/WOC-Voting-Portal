# FROM node:slim AS builder
# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD ["npm", "run", "dev"]

# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (adjust if necessary)
EXPOSE 3000

# Set the command to run your app in development mode using nodemon
CMD ["npm", "run", "dev"]
