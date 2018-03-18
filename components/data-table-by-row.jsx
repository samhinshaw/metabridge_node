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
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props !== nextProps) {
      // Here we want to hash our rows to allow for proper React keys!
      // Using a simple hash will ensure that our
      const hashedData = nextProps.data.map(row => {
        // This is a column name, so has to be something our user wouldn't pick
        row._react_id = hash(`${row}`); /* eslint-disable-line no-param-reassign */
        return row;
      });
      this.setState({ data: hashedData });
    }
  }
  shouldComponentUpdate(nextProps) {
    // Only update if data is not null
    return !!nextProps.data;
  }
  selectTable = event => {
    const { colname } = event.target.dataset;
    this.setState({ selectedColumn: colname });
  };
  // componentDidUpdate() {
  //   console.log('will update with data: ', this.props.uploadedData);
  //   if (this.props.uploadedData.data) {
  //     // add unique ID to each row
  //     this.props.uploadedData.data.map(row => {
  //       console.log('this row is: ', row);
  //       const newRow = Object.assign({}, row, { key: uniqid() });
  //       rows.push(newRow);
  //       return 'assigned uniqid to rows';
  //     });
  //     this.setState({ data: rows });
  //   }
  // }
  render() {
    if (this.state.data) {
      // const columns = Object.keys(this.state.data[0]).map(col => ({
      //   Header: col,
      //   accessor: col
      // }));
      // return <ReactTable data={this.state.data} columns={columns} className="table" />;
      // console.log(this.props.uploadedData.data);
      return (
        <table className="table is-fullwidth is-bordered">
          <thead>
            <tr>
              {this.state.data[0].map(colname => {
                // Leave out the _react_id column
                const lowerColname = colname.replace(/\s/g, '').toLowerCase();
                return (
                  <HoverableTH
                    key={colname}
                    onClick={this.selectTable}
                    data-colname={lowerColname}
                    className={this.state.selectedColumn === lowerColname ? 'is-selected' : ''}
                    tabIndex="0"
                  >
                    {colname}
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
                      const colname = this.state.data[0][colIndex];
                      const lowerColname = colname.replace(/\s/g, '').toLowerCase();
                      // Here we're making a td key from:
                      // column name + row hash + cell contents
                      const key = `${lowerColname}-${row._react_id}-${cell}`;
                      return (
                        <HoverableTD
                          key={key}
                          data-colname={lowerColname}
                          className={
                            this.state.selectedColumn === lowerColname ? 'is-selected' : ''
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
              return null;
            })}
          </tbody>
        </table>
      );
    }
    return <h1>Hello from DataTable!</h1>;
  }
}

export default DataTableByRow;
