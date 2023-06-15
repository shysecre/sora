FROM node:18.16-alpine

WORKDIR /app

EXPOSE 3000

COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]

COPY ["./src", "./src"]
COPY ["./public", "./public"]

RUN yarn && yarn build && yarn global add serve

CMD serve -s build
