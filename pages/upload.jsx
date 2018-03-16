// import Link from 'next/link';
import React, { Component } from 'react';
import glamorous from 'glamorous';
import axios from 'axios';
// import { shape, string } from 'prop-types';
import Layout from '../components/my-layout';
import RadioButtons from '../components/radio-buttons';
import fileSeparators from '../components/file-separators';
// import Button from '../components/button';

const UploadPanel = glamorous.div({
  // backgroundColor: '#FF7B19',
  padding: '10px'
});

const MainPanel = glamorous.div({
  // backgroundColor: '#38A2FF'
});

const Instructions = glamorous.div({
  marginBottom: '24px'
});

const FileUpload = glamorous.div({
  marginBottom: '24px'
});

class Upload extends Component {
  state = {
    fileName: null
    // uploadStatus: ''
  };
  handleUpload = event => {
    // Is is necessary to check if file was input successfully?
    // Going to check for now anyways
    if (event.target.files[0]) {
      this.setState({ fileName: event.target.files[0].name });
      // this.setState({ uploadStatus: 'is-success' });
      // this.sendFileToServer(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };
  sendFileToServer = file => {
    // file is already an object, so can just send that as a JSON POST
    axios
      .post('/upload', file)
      .then()
      .catch();
  };
  render() {
    return (
      <Layout>
        <div className="section">
          <div className="tile is-ancestor">
            <UploadPanel className="tile is-parent is-vertical is-3">
              <div className="card">
                <div className="card-content">
                  <h2 className="title is-size-3">Upload</h2>
                  <Instructions>
                    Upload a plain-text spreadsheet (CSV or TSV) containing your metabolites of
                    interest in a single column, or try out our example dataset.
                  </Instructions>
                  <form>
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
                    <div className="field">
                      <label htmlFor="separator">
                        <strong>Separator</strong>
                        <div className="control" id="separator">
                          <RadioButtons {...fileSeparators} />
                        </div>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </UploadPanel>
            <MainPanel className="tile is-parent is-9">
              {/* <h2 className="title is-size-3">Main Panel</h2> */}
            </MainPanel>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Upload;
