FROM node:18.16-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]

RUN yarn

EXPOSE 3000

COPY ["./src", "./src"]
COPY ["./public", "./public"]

CMD ["yarn", "start"]