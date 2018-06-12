# Sample Project: Reckon

This is a basic isomorphic app, built with react, node/express, ES6, webpack etc.

### Overview
Reckon test:
* test1 - divisble numbers by provided divisors within the lower and upper bounds
* test2 - find all the occurrences of a particular set of characters in a string (without string/text APIs) and post the results back to another API

### install

* `git clone https://github.com/mr-bobz/reckon` - clone locally or download as zip from the site
* `cd reckon` - change to local directory before calling npm install in next step
* `npm i` - install dependencies

### run in dev mode

* `npm run build:watch:server` - runs babel to transpile the server from es6 to es5 (watch mode)
* `npm run build:watch:client` - runs webpack to build bundle (watch mode)
* `npm run start:dev`          - in parallel shell it calls `build:watch:client` `build:watch:server` and then runs the app in watch mode, using nodemon

### run in prod mode

* `npm run build:server` - runs babel to transpile the server from es6 to es5
* `npm run build:client` - runs webpack to build bundle
* `npm run build`        - builds both client and server
* `npm run start`        - runs `build` and then starts the app
* `npm start`            - shortcut, same as `npm run start`
