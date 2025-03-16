FROM node:20
WORKDIR /usr/src/app
RUN npm install --global serve
COPY package*.json ./
COPY .yarnrc.yml ./
RUN corepack enable
RUN corepack install
RUN yarn install
COPY . .
ARG PUBLIC_API_URL
RUN echo $PUBLIC_API_URL
RUN yarn build
EXPOSE 80
CMD ["yarn", "serve"]
