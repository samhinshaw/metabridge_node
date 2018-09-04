// TESTING SERVER

// This is a testing server! It should contain the exact same logic as app.js,
// but without server.listen(). Currently this is required until I can implement
// the fix listed here: https://github.com/zeit/next.js/issues/2931
// Required for server.test.js

const next = require('next');
const express = require('express');

// Let Next know whether we're in production
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const upload = require('./upload');

const server = express();

server.use(`/static`, express.static('static'));

server.use('/upload', upload);

// Dummy route to bring in
server.get('/hello', (req, res) => {
  res.status(200).send('Hello World!');
});

server.get('*', (req, res) => handle(req, res));

module.exports = server;
