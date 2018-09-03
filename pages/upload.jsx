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
    // const { data } = this.state.uploadedData;
    return (
      <Layout>
        <div className="section">
          <div className="columns">
            <UploadPanel className="column is-3">
              <div className="card">
                <div className="card-content">
                  <h2 className="title is-size-3">Upload</h2>
                  <Instructions>
                    Upload a plain-text spreadsheet (CSV or TSV) containing your metabolites of
                    interest in a single column, or try out our example dataset.
                  </Instructions>
                  <form>
                    {/* Separate this out into its own component, but pass in the uploadFile function!
                    The function must be passed in, because uploadFile sets state on THIS page!
                    If we were using Redux (or maybe the new context API? I haven't looked into that ) 
                    yet, we could probably implement this better. */}
                    <FileUpload uploadFile={this.uploadFile} />
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
            <MainPanel className="column is-9">
              {/* <h2 className="title is-size-3">Main Panel</h2> */}
              {/* {console.log("here's the current data: ", uploadedFile)} */}
              {this.state.uploadedData.data ? (
                <DataTableByRow data={this.state.uploadedData.data} />
              ) : (
                <div className="notification is-info">
                  {/* <button className="delete" aria-label="delete" /> */}
                  Upload a file to get started!
                </div>
              )}
              {/* {<DataTableByRow data={data} />} */}
            </MainPanel>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Upload;
