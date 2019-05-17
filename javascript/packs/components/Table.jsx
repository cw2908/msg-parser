import React from 'react';
import PropTypes from 'prop-types';

function Table({ headings, rows }) {
  return (
    <table>
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map(key => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  headings: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default Table;
