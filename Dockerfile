FROM node:8
RUN mkdir -p /web
WORKDIR /web
COPY package.json /web
RUN yarn install
COPY . /web
CMD ["yarn", "build-start-app"]
