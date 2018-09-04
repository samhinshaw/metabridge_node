// NEXT SERVER
// This contains the next server. This handles all server-side rendering! It
// also imports our custom Express.js routes from routes/server.js
const next = require('next');
const express = require('express');
const UninitiatedRollbar = require('rollbar');

const rollbar = new UninitiatedRollbar('ceb9067b85ae4c5a91c08b617d9f94c3');
// Let Next know whether we're in production
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const upload = require('./routes/upload');

// const server = require('./routes/server');

app
  .prepare()
  .then(() => {
    // It may be better to have this server running separately
    // I don't want to have expensive data handling operations crash my view handling
    const server = express();

    server.use(`/static`, express.static('static'));

    server.use('/upload', upload);

    // Dummy route to bring in
    server.get('/hello', (req, res) => {
      res.status(200).send('Hello World!');
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:3000`); /* eslint-disable-line no-console */
    });
  })
  .catch(ex => {
    rollbar.error(ex.stack);
    process.exit(1);
  });
