FROM node:10-alpine
ADD . /var/app
WORKDIR /var/app

ARG REACT_APP_SERVER_URI
ENV REACT_APP_SERVER_URI $REACT_APP_SERVER_URI
ENV PATH="/var/app/node_modules/.bin/:${PATH}"

RUN yarn install
RUN yarn build
CMD yarn start-prod
EXPOSE 5000
