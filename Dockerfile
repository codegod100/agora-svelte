FROM alpine
RUN apk update && apk upgrade
RUN apk add nodejs yarn npm
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD npm run dev