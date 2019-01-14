FROM node:10-alpine
ADD . /var/app
WORKDIR /var/app
ENV PATH="/var/app/node_modules/.bin/:${PATH}"
RUN yarn install
RUN yarn build
CMD serve -s build
EXPOSE 5000
