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
    console.log({ response })
    const body = await response.data
    console.log(body)
    console.log({ bodyType: typeof body })
    this.setState({ emailHeaders: Object.entries(body) })
  }
  render () {
    return (
      <div>
        <main>
          <div className='upload-container'>
            <FileUpload
              handleFile={(e) => this.handleFile(e)}
              clearFile={() => this.clearFile()}
            />
          </div>
          <Table headings={['Header', 'Value']} rows={this.state.emailHeaders} />
        </main>
      </div>
    )
  }

  componentDidMount () {
    // fetch('/products')
    //   .then(response => response.json())
    //   .then(responseData => {
    //     this.setState({
    //       products: responseData
    //     })
    //   })
    //   .catch(error => console.log('Error:', error))
  }
}

export default hot(module)(App)
