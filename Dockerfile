ARG IMAGE_PREFIX
ARG NODE_IMAGE=node:20
ARG NGINX_IMAGE=nginx:alpine

FROM ${IMAGE_PREFIX}${NODE_IMAGE} as builder

WORKDIR /code

ADD package.json .
ADD yarn.lock .

RUN yarn install

ADD . .

RUN yarn build

FROM ${IMAGE_PREFIX}${NGINX_IMAGE} as final

COPY --from=builder /code/public/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-scripts/ /docker-entrypoint.d/
EXPOSE 80 80
