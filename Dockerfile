#FROM node:22-alpine AS build
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#CMD ["npm", "run", "start"]

FROM node:22-alpine AS build

WORKDIR /app

COPY . ./

RUN npm install && npm run build

WORKDIR /output

RUN cp -R /app/dist/book-sphere/browser/* /output

FROM nginx:1.27

WORKDIR /app

COPY --from=build /output/ /app
COPY ./default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]