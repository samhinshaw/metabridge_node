const express = require('express');
const next = require('next');
const UninitiatedRollbar = require('rollbar');
// const bodyParser = require('body-parser');
// const expressSanitizer = require('express-sanitizer');
const multiparty = require('multiparty');
// const fs = require('fs');
const csv = require('fast-csv');

const rollbar = new UninitiatedRollbar('ceb9067b85ae4c5a91c08b617d9f94c3');
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

    // Think about bruteforce prevention here (to stop our server from getting hammered)
    server.put('/upload', (req, res) => {
      // Will have to bring this in from the form separately
      const containsHeaders = true;
      // initialize empty data array
      const uploadedData = [];
      // initialize form for accepting multipart/form-data
      const form = new multiparty.Form();
      // parse this form data!
      form.parse(req, (err, fields, files) => {
        if (err) {
          rollbar.error(err);
          res
            .status(500)
            .json({ type: 'danger', message: 'There was an error uploading your file.' });
          // We should really just be getting only one file, but let's check to be sure.
        } else if (files.file.length > 1) {
          res
            .status(200)
            .json({ type: 'danger', message: 'Please only upload one file at a time.' });
          // Temporary file limit just to be safe--the file may still be on the
          // server, but at least we won't pull all that into memory!
        } else if (files.file.size > 52428800) {
          res.status(200).json({ type: 'danger', message: 'Please limit file size to 50mb.' });
        } else {
          csv
            .fromPath(files.file[0].path, { headers: containsHeaders })
            .on('data', data => {
              uploadedData.push(data);
            })
            .on('end', () => {
              res.status(200).json({
                type: 'success',
                message: 'Success!',
                data: uploadedData,
                headers: containsHeaders
              });
            });
        }
      });
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
