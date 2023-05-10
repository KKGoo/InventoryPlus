FROM docker.io/node:18.16.0-alpine3.17 as builder

WORKDIR /usr/src/app

COPY . .
RUN apk add tar
RUN npm install && npm run build
RUN cd build/ && tar -czvf build.tar.gz *

FROM docker.io/joseluisq/static-web-server:2.15-alpine

RUN apk add tar
COPY --from=builder /usr/src/app/build/build.tar.gz /public

RUN cd /public && tar -xf build.tar.gz && rm build.tar.gz
