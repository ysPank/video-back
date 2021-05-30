# Location Matcher

### Requirements

* node.js v12 +
* npm 6.12 +
* Redis

### Tech

Relies on open source projects to work properly:

* [node.js](https://nodejs.org) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [Sequelize](http://docs.sequelizejs.com/) - RDBMS ORM
* [JOI](https://github.com/hapijs/joi/blob/v14.0.1/API.md) - Object-schema validation
* [Awilix](https://github.com/jeffijoe/awilix) - IoC provider

### Installation

Locator app requires [Node.js](https://nodejs.org/) v12+ to run.
Install the dependencies and devDependencies and start the server.

```
$ cd location-backend
$ npm i
```

For production environments...

```
$ npm install --production
```

### Configuration
Copy `config/default.json` to your custom `config/${environment-name}.json` file to extend default configuration. `${environment-name}` is string value which is taken from `NODE_ENV` environment variable. All environment variables which are the same from env to env should be stored in `default.json`. All environment-specific configuration variables should be stored in `config/env-name.json` files.

### Development
1. Compile source code to common-js

```
$ npm run watch
```
2. run the server

```
$ NODE_ENV=$ENV_NAME npm start
```
### Deploying
1. Build source code using Babel

```
$ npm run build
```
2. Run database migrations

```
$ npm run migrate --env $ENV_NAME
```
2. set environment and run server

```
$ npm start
```
    or

```
$ node ./dist/main.js
```
