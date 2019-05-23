import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'

const HeaderTable = ({ headings, rows }) => {
  return (
    <div className='table-container'>
      <Table hover responsive striped size='sm'>
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
      </Table>
    </div>
  )
}

Table.propTypes = {
  headings: PropTypes.array,
  rows: PropTypes.array
}

export default HeaderTable
