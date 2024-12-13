FROM node:21.7.3-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm i -f

COPY . .

RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]