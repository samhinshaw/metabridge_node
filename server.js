const express = require('express');
const next = require('next');
const Rollbar = require('rollbar');
// const bodyParser = require('body-parser');
// const expressSanitizer = require('express-sanitizer');
const multiparty = require('multiparty');

const rollbar = new Rollbar('ceb9067b85ae4c5a91c08b617d9f94c3');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // bodyParser middleware
    // server.use(bodyParser.json());
    // server.use(bodyParser.urlencoded({ extended: true }));
    // server.use(expressSanitizer()); // this line follows bodyParser() instantiations

    server.post('/upload', (req, res) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        console.log('errors: ', err);
        console.log('fields: ', fields);
        console.log('files: ', files);
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.write('received upload:\n\n');
        // res.end(util.inspect({ fields, files }));
      });
      // res.redirect('#');
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
