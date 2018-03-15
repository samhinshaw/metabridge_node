import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { string, arrayOf, shape } from 'prop-types';
import glamorous from 'glamorous';
import { mainMenuItems, endMenuButtons } from './navbar-items';
import Button from './button';

// Since we're putting a dark navbar within a light hero, we need to override
// the .hero .nav {background: none;} styling
const DarkNav = glamorous.nav({
  backgroundColor: '#363636'
});

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
  // Fix this to handle the /help dropdown nav menu
  tabIsActive = href => {
    if (href === this.props.router.pathname) return 'is-active';
    return '';
  };
  render() {
    return (
      <DarkNav className="navbar is-dark">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src="/static/logo_white.svg"
              alt="MetaBridge: a modern CSS framework based on Flexbox"
              width="56"
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
            {mainMenuItems.map(item => {
              if (item.submenu) {
                return (
                  <DropdownMenuItem
                    // Fix this to handle the /help dropdown nav menu
                    className={`navbar-item ${this.tabIsActive(item.link)}`}
                    {...item}
                    key={item.link}
                  />
                );
              }
              return (
                <MenuItem
                  className={`navbar-item ${this.tabIsActive(item.link)}`}
                  {...item}
                  key={item.link}
                />
              );
            })}
          </div>

          <div className="navbar-end">
            {/* {endMenuButtons.map(item => <MenuItem {...item} key={item.link} />)} */}
            <div className="navbar-item">
              <div className="field is-grouped">
                {endMenuButtons.map(button => <Button {...button} key={button.link} />)}
              </div>
            </div>
          </div>
        </div>
      </DarkNav>
    );
  }
}

NavBar.propTypes = {
  router: shape({
    pathname: string.isRequired
  }).isRequired
};

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
      {props.submenu.map(subitem => <MenuItem {...subitem} key={subitem.link} />)}
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

export default withRouter(NavBar);
