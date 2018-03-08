import Link from 'next/link';
import React from 'react';
import { shape, string } from 'prop-types';
import Layout from '../components/my-layout';

function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ];
}

const PostLink = props => (
  <li>
    <Link as={`/p/${props.post.id}`} href={`/post?title=${props.post.title}`}>
      <a>{props.post.title}</a>
    </Link>
  </li>
);

PostLink.propTypes = {
  post: shape({
    id: string.isRequired,
    title: string.isRequired
  }).isRequired
};

// class PostLink extends Component {
//   static propTypes = {
//     key: string.isRequired,
//     post: shape({
//       id: string.isRequired,
//       title: string.isRequired
//     }).isRequired
//   };
//   render() {
//     return (
//       <li>
//         <Link as={`/p/${this.props.post.id}`} href={`/post?title=${this.props.post.title}`}>
//           <a>{this.props.post.title}</a>
//         </Link>
//       </li>
//     );
//   }
// }

const HomePage = () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>{getPosts().map(post => <PostLink key={post.id} post={post} />)}</ul>
  </Layout>
);

export default HomePage;
