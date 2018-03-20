import React, { Component } from 'react';
import { shape } from 'prop-types';
import glamorous from 'glamorous';
import '../styles/mystyles.scss';
import NavBar from './navbar';

// make glamorous styling most important
// only need to do this at document root! :)
import './style-importance';

const ThinNav = glamorous.nav({
  // padding: '1.5rem'
});

class Layout extends Component {
  static propTypes = {
    children: shape({})
  };

  static defaultProps = {
    children: {}
  };

  state = {
    classToOpenModal: 'modal'
  };

  openModal = () => {
    this.setState({ classToOpenModal: 'modal is-active' });
  };

  // afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  // };

  closeModal = () => {
    this.setState({ classToOpenModal: 'modal' });
  };

  // Could work with booleans, but this is much more straightforward!
  // isModalOpen = () => (this.state.modalIsOpen ? 'modal is-active' : 'modal');

  render() {
    if (this.props.children.props.id === 'welcomeHero') {
      return <div>{this.props.children}</div>;
    }
    return (
      <div>
        <NavBar onClick={this.openModal} />
        <div className={this.state.classToOpenModal}>
          <div
            onClick={this.closeModal}
            onKeyPress={this.closeModal}
            className="modal-background"
            aria-label="close"
            role="button"
            tabIndex="0"
          />
          <div className="modal-card">
            <header className="modal-card-head is-warning">
              <p className="modal-card-title">Clear Session?</p>
              <button onClick={this.closeModal} className="delete" aria-label="close" />
            </header>
            <section className="modal-card-body">
              <article className="message is-warning">
                <div className="message-body">
                  Are you sure you wish to clear your current session? Your data will not be
                  recoverable!
                </div>
              </article>
            </section>
            <footer className="modal-card-foot">
              <button onClick={this.closeModal} className="button is-warning">
                Clear Session
              </button>
              <button onClick={this.closeModal} className="button">
                Cancel
              </button>
            </footer>
          </div>
        </div>
        {this.props.children}
        <ThinNav className="navbar is-fixed-bottom is-dark" />
      </div>
    );
  }
}

export default Layout;
