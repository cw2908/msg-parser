import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class FileUpload extends Component {
  render () {
    const { handleFile, clearFile } = this.props
    return (
      <div className='file-upload'>
        <label htmlFor='csvFile'>Select File</label>
        <input
          id='csvFile'
          type='file'
          multiple={false}
          onChange={(e) => handleFile(e)}
        />
      </div>
    )
  }
}

FileUpload.propTypes = {
  handleFile: PropTypes.func.isRequired,
  clearFile: PropTypes.func.isRequired
}

export default FileUpload
