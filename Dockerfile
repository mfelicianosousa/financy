FROM node:12-alpine as build
WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@7.3.10

COPY . .
RUN ng build --configuration=production

FROM nginx:latest
COPY --from=build app/dist/* /usr/share/nginx/html

EXPOSE 80


