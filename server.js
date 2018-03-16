const express = require('express');
const next = require('next');
const Rollbar = require('rollbar');

const rollbar = new Rollbar('ceb9067b85ae4c5a91c08b617d9f94c3');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.post('/upload', (req, res) => {
      console.log(req.body);
      res.redirect('#');
      // const actualPage = '/post';
      // const queryParams = { id: req.params.id };
      // app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.use(rollbar.errorHandler());

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
