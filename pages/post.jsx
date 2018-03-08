// import axios from 'axios';
import React from 'react';
import { shape, string } from 'prop-types';
import Layout from '../components/my-layout';

const Post = props => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <div>
      <p>Hello World!</p>
    </div>
  </Layout>
);

Post.propTypes = {
  url: shape({
    query: shape({
      url: string.isRequired
    }).isRequired
  }).isRequired
};

// If was not required
// Post.defaultProps = {
//   url: {
//     query: {
//       title: 'Hello World!'
//     }
//   }
// };

export default Post;
