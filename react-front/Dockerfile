FROM node:10.15

# set working directory
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/src
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./src /usr/src/app/src
COPY .babelrc /usr/src/app/.babelrc
COPY package.json /usr/src/app/package.json
RUN npm install --silent

# start app
CMD ["npm", "run", "dev"]