import React, { Component } from 'react';
import { shape, arrayOf } from 'prop-types';
import hash from 'string-hash';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
// import glamorous from 'glamorous';

// if (data.headers) {
// If headers, then fast-csv parses each element of the array as a column
// This means each element is an object, in which each key is the column name
// return <DataTableByCol {...data} />;
// }
// Otherwise, each element of the array is a row
// In this case, each element is an array with the index indicating the column
// return <DataTableByRow {...data} />;

// const HoverableTable = glamorous.table({
//   // .table.is-hoverable tbody tr:not(.is-selected):hover
// });

class DataTableByCol extends Component {
  static propTypes = {
    data: arrayOf(shape({}))
  };

  // Change this!
  static defaultProps = {
    data: null
  };
  state = {
    // Initially, data is just passed props
    data: null
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props !== nextProps) {
      // Here we want to hash our rows to allow for proper React keys!
      // Using a simple hash will ensure that our
      const hashedData = nextProps.data.map(col => {
        // This is a column name, so has to be something our user wouldn't pick
        col._react_id = hash(`${Object.values(col)}`); /* eslint-disable-line no-param-reassign */
        return col;
      });
      this.setState({ data: hashedData });
    }
  }
  shouldComponentUpdate(nextProps) {
    // Only update if data is not null
    return !!nextProps.data;
  }
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
              {Object.keys(this.state.data[0]).map(colname => {
                // Leave out the _react_id column
                if (colname !== '_react_id') {
                  return (
                    <th key={colname} className={colname}>
                      {colname}
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(row => (
              // For the row ID, just grab the first value in each row.
              // Not perfect, as there could be duplicates, but okay for now.
              // Consider the uniqid package: https://www.npmjs.com/package/uniqid
              <tr key={row._react_id}>
                {Object.keys(row).map(colname => {
                  // Leave out the _react_id column
                  if (colname !== '_react_id') {
                    // Here we're making a td key from:
                    // column name + row hash + cell contents
                    const key = `${colname}-${row._react_id}-${row[colname]}`;
                    return <td key={key}>{row[colname]}</td>;
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <h1>No Data!</h1>;
  }
}

export default DataTableByCol;
