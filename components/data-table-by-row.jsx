import React, { Component } from 'react';
import { string, arrayOf } from 'prop-types';
import hash from 'string-hash';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import glamorous from 'glamorous';

// if (data.headers) {
// If headers, then fast-csv parses each element of the array as a column
// This means each element is an object, in which each key is the column name
// return <DataTableByCol {...data} />;
// }
// Otherwise, each element of the array is a row
// In this case, each element is an array with the index indicating the column
// return <DataTableByRow {...data} />;

// const HoverableTable = glamorous.table({
//   'td:not(.is-selected):hover': {
//     backgroundColor: '#fafafa'
//   }
// });
const HoverableTD = glamorous.td({
  ':not(.is-selected):hover': {
    backgroundColor: '#fafafa'
  }
});

const HoverableTH = glamorous.th({
  ':not(.is-selected):hover': {
    backgroundColor: '#fafafa'
  }
});

class DataTableByRow extends Component {
  static propTypes = {
    data: arrayOf(arrayOf(string))
  };

  // Change this!
  static defaultProps = {
    data: null
  };

  state = {
    // Initially, data is just passed props
    data: null,
    selectedColumn: null
  };
  // I figured out the rendering problem!!! If we had conditional rendering of
  // the component, then it wouldn't be rendered with null data initially.
  // However, we were only checking for new data on
  // `componentWillReceiveProps()`. However, this doesn't get called on first
  // render, so we weren't actually calling it until it was rendered for a
  // second time (when it got a SECOND csv?)! SO, instead we're calling
  // `hashArray()` on `componentWillMount()` when it mounts the first time AND
  // `componentWillReceiveProps()`, before it updates each subsequent time.
  componentWillMount() {
    this.hashArray(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    // If we actually have non-null data AND we're not getting the same props
    if (nextProps.data && this.props !== nextProps) {
      this.hashArray(nextProps.data);
    }
  }
  shouldComponentUpdate(nextProps) {
    // Only update if data is not null
    return !!nextProps.data;
  }
  selectTable = event => {
    const { colName } = event.target.dataset;
    this.setState({ selectedColumn: colName });
  };
  hashArray = arrayToHash => {
    // Here we want to hash our rows to allow for proper React keys!
    // Using a simple hash will ensure that our
    const hashedData = arrayToHash.map(row => {
      // This is a column name, so has to be something our user wouldn't pick
      row._react_id = hash(`${row}`); /* eslint-disable-line no-param-reassign */
      return row;
    });
    this.setState({ data: hashedData });
  };
  render() {
    // Only render if we actually have data!
    if (this.state.data) {
      return (
        <table className="table is-fullwidth is-bordered">
          <thead>
            <tr>
              {/* Only map the first row to TableHead (data[0]) */}
              {this.state.data[0].map(colName => {
                // Leave out the _react_id column
                const lowerColName = colName.replace(/\s/g, '').toLowerCase();
                return (
                  <HoverableTH
                    key={colName}
                    onClick={this.selectTable}
                    data-colname={lowerColName}
                    className={this.state.selectedColumn === lowerColName ? 'is-selected' : ''}
                    tabIndex="0"
                  >
                    {colName}
                  </HoverableTH>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row, rowIndex) => {
              // Don't return the first row, that's the header!
              if (rowIndex !== 0) {
                return (
                  // For the row ID, just grab the first value in each row.
                  // Not perfect, as there could be duplicates, but okay for now.
                  // Consider the uniqid package: https://www.npmjs.com/package/uniqid
                  <tr key={row._react_id}>
                    {row.map((cell, colIndex) => {
                      const colName = this.state.data[0][colIndex];
                      const lowerColName = colName.replace(/\s/g, '').toLowerCase();
                      // Here we're making a td key from:
                      // column name + row hash + cell contents
                      const key = `${lowerColName}-${row._react_id}-${cell}`;
                      return (
                        <HoverableTD
                          key={key}
                          data-colname={lowerColName}
                          className={
                            this.state.selectedColumn === lowerColName ? 'is-selected' : ''
                          }
                          onClick={this.selectTable}
                        >
                          {cell}
                        </HoverableTD>
                      );
                    })}
                  </tr>
                );
              }
              // Return null for the first row
              return null;
            })}
          </tbody>
        </table>
      );
    }
    // Otherwise, if no data, just return null
    return null;
  }
}

export default DataTableByRow;
