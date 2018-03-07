import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/my-layout';

interface Show {
  id: string;
  name: string;
}

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map((show: Show) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async () => {
  const response = await axios.get('https://api.tvmaze.com/search/shows?q=batman');

  console.log(`Show data fetched. Count: ${response.data.length}`);

  return {
    shows: response.data
  };
};

export default Index;
