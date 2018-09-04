const request = require('supertest');
const server = require('../routes/server.js');

// Super straightforward test
describe('Test a simple get request.', () => {
  test('It should response the GET method', async () => {
    const response = await request(server).get('/hello');
    expect(response.statusCode).toBe(200);
  });
});

// const delimiter = 'commaSep';

//! REFACTOR ME! Parse the data here, don't PUT.
// ? I shouldn't bother testing this, because I should refactor this to parse the
// ? data on the front end, and then just hit my server's API (yet to be written)
// ? for the mapping data
// * Later, we'll write a REST or GraphQL API to give the metabolite mappings.

// describe('Test a file upload.', () => {
//   test('We should be able to upload a file', async () => {
//     const data = new FormData();
//     data.append('delimiter', delimiter);
//     // Then append the file
//     data.append('file', file);
//     // And post the multipart/form-data object to the server
//     request(server)
//       .put('/upload', data)
//       .then(res => {
//         if (res.data.type === 'success') {
//           // Got a little side-tracked worrying about setting state here...
//           // but having state depend on state is where it gets dangerous!
//           this.setState({ uploadedData: { headers: res.data.headers, data: res.data.data } });
//         }
//       })
//       .catch(err => {
//         Rollbar.error(err);
//       });
//     const response = await request(server).get('/hello');
//     expect(response.statusCode).toBe(200);
//   });
// });
