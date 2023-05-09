FROM docker.io/node:18.16.0-alpine3.17

WORKDIR /home/app/web

COPY . .

RUN npm install

RUN mkdir db

CMD ["npm", "run", "server"]