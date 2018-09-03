import React, { Component } from 'react';
import glamorous from 'glamorous';
import { func } from 'prop-types';

const UploadBox = glamorous.div({
  marginBottom: '24px'
});

class FileUpload extends Component {
  // uploadFile function MUST BE PASSED IN
  static propTypes = {
    uploadFile: func.isRequired
  };

  state = {
    filename: ''
  };

  handleUpload = event => {
    // Is is necessary to check if file was input successfully?
    // Going to check for now anyways
    if (event.target.files[0]) {
      this.setState({ filename: event.target.files[0].name });
      // this.setState({ uploadStatus: 'is-success' });
      // If the user uploaded a TEXT file, use it!
      if (event.target.files[0].type.startsWith('text/')) {
        // Note that our uploadFile function MUST BE PASSED IN
        this.props.uploadFile(event.target.files[0]);
      } else {
        // Otherwise, do something to inform user their upload was invalid
      }
    }
  };
  render() {
    return (
      <UploadBox className="file has-name is-centered is-boxed" id="fileUpload">
        <label className="file-label" htmlFor="metaboliteUpload">
          <input
            className="file-input"
            type="file"
            name="metaboliteUpload"
            id="metaboliteUpload"
            onChange={this.handleUpload}
            // See 'uncontrolled components' to understand why ref is necessary
            // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
            // without this binding, this.fileInput will be undefined, because this
            // refers to the fileUpload component, not the fileUpload DOM input element
            ref={input => {
              this.fileInput = input;
            }}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload" />
            </span>
            <span className="file-label">Upload Metabolites</span>
          </span>
          <span className="file-name">{this.state.filename}</span>
        </label>
      </UploadBox>
    );
  }
}

export default FileUpload;
