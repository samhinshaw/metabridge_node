const express = require('express');
const multiparty = require('multiparty');
const csv = require('fast-csv');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');
const UninitiatedRollbar = require('rollbar');

const { window } = new JSDOM('');
const purify = createDOMPurify(window);
const rollbar = new UninitiatedRollbar('ceb9067b85ae4c5a91c08b617d9f94c3');

const fileDelimiters = {
  commaSep: ',',
  tabSep: '\t',
  semicolonSep: ';'
};

const router = express.Router();

router.put('/', (req, res) => {
  // Will have to bring this in from the form separately
  const containsHeaders = false;
  // initialize empty data array
  const uploadedData = [];
  // initialize form for accepting multipart/form-data
  const form = new multiparty.Form();
  // parse this form data!
  form.parse(req, (err, fields, files) => {
    if (err) {
      rollbar.error(err);
      res.status(500).json({ type: 'danger', message: 'There was an error uploading your file.' });
      // We should really just be getting only one file, but let's check to be sure.
    } else if (files.file.length > 1) {
      res.status(200).json({ type: 'danger', message: 'Please only upload one file at a time.' });
      // Temporary file limit just to be safe--the file may still be on the
      // server, but at least we won't pull all that into memory!
    } else if (files.file.size > 52428800) {
      res.status(200).json({ type: 'danger', message: 'Please limit file size to 50mb.' });
    } else {
      // Get the delimiter from the fields, using the previously defined
      // object as our 'dictionary' for translating the HTML-friendly names
      // like 'commaSep' to the actual delimiters like ','
      const delimiter = fileDelimiters[fields.delimiter[0]];
      const filePath = files.file[0].path;
      // Save the most recently read file path
      // Might have to set this by session/cookie?
      res.locals.mostRecentFile = filePath;
      // read the CSV in
      csv
        // from the file path
        .fromPath(filePath, { headers: containsHeaders, delimiter })
        .on('data', data => {
          // and sanitize the inputs
          const row = [];
          data.forEach(cell => {
            // row.push(xssFilters.inHTMLData(cell));
            row.push(purify.sanitize(cell));
          });
          uploadedData.push(row);
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

module.exports = router;
