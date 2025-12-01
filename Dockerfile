FROM node:25-alpine

WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
