FROM node:10-alpine
ADD . /var/app
WORKDIR /var/app
RUN yarn install
CMD yarn start-prod
EXPOSE 4000
