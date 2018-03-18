// import Link from 'next/link';
import React, { Component } from 'react';
import glamorous from 'glamorous';
import axios from 'axios';
// import { shape, string } from 'prop-types';

import Layout from '../components/my-layout';
import RadioButtons from '../components/radio-buttons';
import fileDelimiters from '../component-data/file-delimiters';
// import DataTableByCol from '../components/data-table-by-col';
import DataTableByRow from '../components/data-table-by-row';
import FileUpload from '../components/file-upload';
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

const axiosConfig = {
  // onUploadProgress(progressEvent) {
  //   const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
  // }
};

class Upload extends Component {
  state = {
    uploadedData: {
      data: null,
      headers: true
    },
    delimiter: 'commaSep'
    // file: null,
    // uploadStatus: ''
  };
  uploadFile = file => {
    // initialize FormData object
    const data = new FormData();
    data.append('delimiter', this.state.delimiter);
    // Then append the file
    data.append('file', file);
    // And post the multipart/form-data object to the server
    axios
      .put('/upload', data, axiosConfig)
      .then(res => {
        if (res.data.type === 'success') {
          // Got a little side-tracked worrying about setting state here...
          // but having state depend on state is where it gets dangerous!
          this.setState({ uploadedData: { headers: res.data.headers, data: res.data.data } });
        }
      })
      .catch(err => {
        Rollbar.error(err);
      });
  };
  // This takes in separator from RadioButtons (which calls this.props.onChange())
  handleSepChange = delim => {
    this.setState({ delimiter: delim });
    // this.reprocessFile(delim);
  };
  // reprocessFile(delim) {
  //   axios
  //     .put('/upload/reprocess', { delim }, axiosConfig)
  //     .then(res => {
  //       if (res.data.type === 'success') {
  //         // Got a little side-tracked worrying about setting state here...
  //         // but having state depend on state is where it gets dangerous!
  //         this.setState({ uploadedData: { headers: res.data.headers, data: res.data.data } });
  //       }
  //     })
  //     .catch(err => {
  //       Rollbar.error(err);
  //     });
  // }
  render() {
    const { data } = this.state.uploadedData;
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
                    <FileUpload uploadFile={this.uploadFile} />
                    {/* <FileUpload className="file has-name is-centered is-boxed" id="fileUpload">
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
                        <span className="file-name">{this.state.filename}</span>
                      </label>
                    </FileUpload> */}
                    <div className="field">
                      <label htmlFor="separator">
                        <strong>Separator</strong>
                        <div className="control" id="separator">
                          {/* By specifying a function here, we can take in an argument pass UP from RadioButtons */}
                          <RadioButtons {...fileDelimiters} onChange={this.handleSepChange} />
                        </div>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </UploadPanel>
            <MainPanel className="tile is-parent is-9">
              {/* <h2 className="title is-size-3">Main Panel</h2> */}
              {/* {console.log("here's the current data: ", uploadedFile)} */}
              {data ? <DataTableByRow data={data} /> : <h1>Hello from Upload</h1>}
              {/* {<DataTableByRow data={data} />} */}
            </MainPanel>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Upload;
