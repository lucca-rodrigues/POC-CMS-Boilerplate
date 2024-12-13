FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /usr/src/app/assets/uploads
RUN chmod -R 777 /usr/src/app/assets/uploads

ENV DOCKER_ENV=true

EXPOSE 3333

CMD ["npm", "run", "start:dev"]