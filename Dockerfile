FROM node:21-slim AS build
WORKDIR /app

COPY . /app/

RUN npm install

RUN ["npm", "run", "build"]

FROM nginx AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]