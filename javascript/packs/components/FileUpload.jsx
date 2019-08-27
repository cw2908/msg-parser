import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class FileUpload extends Component {
  render () {
    const { handleFile, clearFile } = this.props
    return (
      <>
        <input
          id='file'
          className='inputfile'
          type='file'
          name='file'
          multiple={false}
          onChange={e => handleFile(e)}
        />
        <label htmlFor='file'>Select File</label>
      </>
    )
  }
}

FileUpload.propTypes = {
  handleFile: PropTypes.func.isRequired,
  clearFile: PropTypes.func.isRequired
}

export default FileUpload
