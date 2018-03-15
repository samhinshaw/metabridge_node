import React from 'react';
import { shape } from 'prop-types';
import 'bulma/css/bulma.css';
import NavBar from './navbar';
// make glamorous styling most important
// only need to do this at document root! :)
import '../components/style-importance';

const Layout = props => {
  if (props.children.props.id === 'welcomeHero') {
    return <div>{props.children}</div>;
  }
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
};

Layout.propTypes = {
  children: shape({})
};

Layout.defaultProps = {
  children: {}
};

export default Layout;
