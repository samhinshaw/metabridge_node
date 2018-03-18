// Note: this component is not currently being used, and actually lives inside
// of my-layout.jsx. The reason for this is that we want to uplift the state of
// the modal so that it can be opened by other components (in this case NavBar).
// However, we may want a separate Modal component in the future to allow the
// content of the Modal to be changed easily. In this case, we could hold the
// state of the Modal within my-layout and pass it down to the Modal as props.

import React, { Component } from 'react';

class Modal extends Component {
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
    return (
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
    );
  }
}

export default Modal;
