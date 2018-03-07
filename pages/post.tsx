import Layout from '../components/my-layout';

export default (props: { url: { query: { title: string } } }) => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content.</p>
  </Layout>
);
