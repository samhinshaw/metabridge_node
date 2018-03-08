import Link from 'next/link';
import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import 'bulma/css/bulma.css';

const menuItems = [
  { key: 1, title: 'Welcome', link: '/' },
  { key: 2, title: 'Upload', link: '/upload' },
  { key: 3, title: 'Map', link: '/map' },
  { key: 4, title: 'Pathview', link: '/pathview' },
  {
    key: 5,
    title: 'Help',
    link: '/help',
    submenu: [
      { key: 1, title: 'Tutorial', link: '/help/tutorial' },
      { key: 2, title: 'About', link: '/help/about' }
    ]
  }
];

class NavBar extends React.Component {
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  toggleKeypress = event => {
    if (event.key === ' ' || event.key === 'Enter') {
      this.toggle();
    }
  };
  render() {
    return (
      <nav className="navbar is-dark">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="/static/logo_white.svg"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
          <div
            role="menubar"
            tabIndex="0"
            className={`navbar-burger burger ${this.state.isOpen ? 'is-active' : ''}`}
            onClick={this.toggle}
            onKeyPress={this.toggleKeypress}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            {menuItems.map(item => {
              if (item.submenu) {
                return <DropdownMenuItem {...item} />;
              }
              return <MenuItem {...item} />;
            })}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a
                    className="bd-tw-button button"
                    data-social-network="Twitter"
                    data-social-action="tweet"
                    data-social-target="http://localhost:4000"
                    href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms"
                  >
                    <span className="icon">
                      <i className="fab fa-twitter" />
                    </span>
                    <span>Tweet</span>
                  </a>
                </p>
                <p className="control">
                  <a
                    className="button is-primary"
                    href="https://github.com/jgthms/bulma/archive/0.5.1.zip"
                  >
                    <span className="icon">
                      <i className="fas fa-download" />
                    </span>
                    <span>Download</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const MenuItem = props => (
    <Link href={props.link}>
      <a className={props.className}>{props.title}</a>
    </Link>
  );

MenuItem.propTypes = {
  title: string.isRequired,
  link: string.isRequired,
  className: string
};

MenuItem.defaultProps = {
  className: 'navbar-item'
};

const DropdownMenuItem = props => (
  <div className="navbar-item has-dropdown is-hoverable">
    <MenuItem {...props} className="navbar-link" />
    <div className="navbar-dropdown is-boxed">
      {props.submenu.map(subitem => <MenuItem {...subitem} />)}
    </div>
  </div>
);

DropdownMenuItem.propTypes = {
  title: string.isRequired,
  link: string.isRequired,
  submenu: arrayOf(
    shape({
      title: string.isRequired,
      link: string.isRequired
    })
  ).isRequired
};

export default NavBar;
