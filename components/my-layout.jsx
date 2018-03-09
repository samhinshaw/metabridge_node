import React from 'react';
import { shape } from 'prop-types';
import NavBar from './navbar';

const Layout = props => (
  <div>
    <NavBar />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: shape({})
};

Layout.defaultProps = {
  children: {}
};

export default Layout;
