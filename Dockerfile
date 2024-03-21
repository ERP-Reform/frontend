FROM node:lts-alpine AS base
WORKDIR /app

COPY package.json ./
RUN npm i
COPY . /app/ 
RUN npm run build

FROM nginx:1.25.4-alpine AS runner

COPY --from=base /app/build  /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

#fire up nginx
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]