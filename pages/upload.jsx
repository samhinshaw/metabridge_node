// import Link from 'next/link';
import React from 'react';
import glamorous from 'glamorous';
// import { shape, string } from 'prop-types';
import Layout from '../components/my-layout';
// import Button from '../components/button';

const UploadPanel = glamorous.div({
  // backgroundColor: '#FF7B19',
  padding: '10px'
});

const MainPanel = glamorous.div({
  // backgroundColor: '#38A2FF'
});

const Upload = () => (
  <Layout>
    <div className="section">
      <div className="tile is-ancestor">
        <UploadPanel className="tile is-parent is-vertical is-3">
          <div className="tile is-child">
            <h2 className="title is-size-3">Upload</h2>
            <div className="box">
              <p>
                Upload a plain-text spreadsheet (CSV or TSV) containing your metabolites of interest
                in a single column, or try out our example dataset.
              </p>
              <div className="file">
                <label className="file-label" htmlFor="metaboliteUpload">
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
                    <span className="file-label">Choose a file…</span>
                  </span>
                </label>
              </div>
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

export default Upload;
