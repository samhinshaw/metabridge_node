import React from 'react';

// if (data.headers) {
// If headers, then fast-csv parses each element of the array as a column
// This means each element is an object, in which each key is the column name
// return <DataTableByCol {...data} />;
// }
// Otherwise, each element of the array is a row
// In this case, each element is an array with the index indicating the column
// return <DataTableByRow {...data} />;

const DataTable = uploadedData => {
  if (uploadedData.data) {
    if (uploadedData.headers) {
      // console.log(uploadedData.data);
      return (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              {Object.keys(uploadedData.data[0]).map(colname => <th key={colname}>{colname}</th>)}
            </tr>
          </thead>
          <tbody>
            {uploadedData.data.map(row => {
              // For the row ID, just grab the first value in each row.
              // Not perfect, as there could be duplicates, but okay for now.
              // Consider the uniqid package: https://www.npmjs.com/package/uniqid
              const rowID = row[Object.keys(row)[0]];
              return (
                <tr key={rowID}>
                  {Object.keys(row).map(colname => <td key={row[colname]}>{row[colname]}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
  return <h1>No Data!</h1>;
};

export default DataTable;
