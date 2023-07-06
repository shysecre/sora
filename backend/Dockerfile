FROM node:18.16-alpine

WORKDIR /app

EXPOSE 443

COPY ["package.json", "yarn.lock", "tsconfig.json", "nest-cli.json", "tsconfig.build.json", ".env", "./"]

COPY ["./src", "./src"]

RUN apk --update --no-cache add curl
RUN yarn && yarn build

CMD ["yarn", "start:prod"]