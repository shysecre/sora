FROM node:18.16-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "tsconfig.json", "nest-cli.json", "tsconfig.build.json", ".env", "./"]

RUN yarn

EXPOSE 5001

COPY ["./src", "./src"]

CMD ["yarn", "start:dev"]