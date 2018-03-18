import React from 'react';
// Fix this!!
class FileUpload extends Component {
  render() {
    return (
      <FileUpload className="file has-name is-centered is-boxed" id="fileUpload">
        <label className="file-label" htmlFor="metaboliteUpload">
          <input
            className="file-input"
            type="file"
            name="metaboliteUpload"
            id="metaboliteUpload"
            onChange={this.handleUpload}
            // See 'uncontrolled components' to understand why ref is necessary
            // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
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
          <span className="file-name">{this.state.fileName}</span>
        </label>
      </FileUpload>
    );
  }
}
