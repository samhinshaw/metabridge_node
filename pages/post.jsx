import React from 'react';
import Layout from '../components/my-layout';

export default props => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content.</p>
  </Layout>
);
// # sourceMappingURL=post.jsx.map
