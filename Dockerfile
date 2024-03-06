FROM node:21-alpine AS build
WORKDIR /app
COPY . /app/

RUN corepack enable
RUN pnpm fetch && pnpm install --frozen-lockfile --offline
RUN ["pnpm", "run", "build"]

FROM nginx:stable-alpine-slim

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
