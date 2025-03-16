FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
COPY .yarnrc.yml ./
RUN corepack enable
RUN corepack install
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3001
CMD ["node", "dist/src/main"]
