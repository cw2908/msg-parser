import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import FileUpload from './components/FileUpload'
import Table from './components/Table'
import axios from 'axios'

class App extends Component {
  state = {
    emailHeaders: []
  }

  handleFile = async (e) => {
    let file = e.target.files[0]
    console.log({ file })
    let formData = new FormData()
    formData.append('file', file)
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    const response = await axios.post('msg', formData, headers)
    const body = await response.json()
    console.log({ body })
    this.setState({ emailHeaders: body })
  }
  render () {
    return (
      <div>
        <FileUpload
          handleFile={(e) => this.handleFile(e)}
          clearFile={() => this.clearFile()}
        />
        <Table headings={['Header', 'Value']} rows={this.state.emailHeaders} />
      </div>
    )
  }

  componentDidMount () {
    fetch('/products')
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          products: responseData
        })
      })
      .catch(error => console.log('Error:', error))
  }
}

export default hot(module)(App)
