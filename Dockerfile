FROM node:16.18-alpine

WORKDIR /app

ADD package.json .
ADD yarn.lock .
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]