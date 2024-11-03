FROM node:22.7-slim
WORKDIR /user
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3002
