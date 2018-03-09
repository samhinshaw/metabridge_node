// import Link from 'next/link';
import React from 'react';
import glamorous from 'glamorous';
// import { shape, string } from 'prop-types';
import Layout from '../components/my-layout';
import '../components/style-importance';
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

const RadioLabel = glamorous.span({
  marginLeft: '5px'
});

const Upload = () => (
  <Layout>
    <div className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <UploadPanel className="tile is-parent is-vertical is-3">
            <div className="card">
              <div className="card-content">
                <h2 className="title is-size-3">Upload</h2>
                <Instructions>
                  Upload a plain-text spreadsheet (CSV or TSV) containing your metabolites of
                  interest in a single column, or try out our example dataset.
                </Instructions>
                <form action="">
                  <FileUpload className="field">
                    <label className="file-label" htmlFor="metaboliteUpload">
                      <strong>Upload Metabolites</strong>
                    </label>
                    <div className="file" id="fileUpload">
                      <input
                        className="file-input"
                        type="file"
                        name="metaboliteUpload"
                        id="metaboliteUpload"
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload" />
                        </span>
                        <span className="file-label">Choose a file...</span>
                      </span>
                    </div>
                  </FileUpload>
                  <div className="field">
                    <label htmlFor="separator">
                      <strong>Separator</strong>
                    </label>
                    <div className="control" id="separator">
                      <label className="radio" htmlFor="commaSep">
                        <input type="radio" name="separator" id="commaSep" />
                        <RadioLabel>Comma</RadioLabel>
                      </label>
                      <label className="radio" htmlFor="tabSep">
                        <input type="radio" name="separator" id="tabSep" />
                        <RadioLabel>Tab</RadioLabel>
                      </label>
                      <label className="radio" htmlFor="semiSep">
                        <input type="radio" name="separator" id="semiSep" />
                        <RadioLabel>Semicolon</RadioLabel>
                      </label>
                    </div>
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
    </div>
  </Layout>
);

export default Upload;
