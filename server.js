const debug = require('debug')('javascript');
const express = require('express');
const jsonServer = require('json-server');
const logger = require('morgan');
const path = require('path');
const config = require('./public/assets/src/config');

const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.host);
  res.header('Referrer-Policy', 'same-origin');
  next();
});

// const app = express();
const appName = 'taylor_javascript-promises-async-programming';
const port = process.env.PORT || config.port;

debug('Booting... %o', appName);
server.use(logger('dev'));

// Base...
server.use(express.static(path.join(__dirname, 'public')));
server.use('/understanding', (req, res) => {
  res.sendFile(path.join(`${__dirname}/docs/understanding.html`));
});
server.use('/consuming', (req, res) => {
  res.sendFile(path.join(`${__dirname}/docs/consuming.html`));
});
server.use('/creating', (req, res) => {
  res.sendFile(path.join(`${__dirname}/docs/creating.html`));
});
server.use('/iterating', (req, res) => {
  res.sendFile(path.join(`${__dirname}/docs/iterating.html`));
});

// Routes
server.get('/orderStatuses', (req, res, next) => {
  setTimeout(() => {
    next();
  }, 15e2);
});

// Export
server.use(router);
if (require.main === module) {
  server.listen(port, () => {
    console.info(`Express started on port:${port}.`);
  });
} else {
  module.exports = server;
}
