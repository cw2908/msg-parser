import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import FileUpload from './components/FileUpload'
import Table from './components/Table'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'

class App extends Component {
  state = {
    emailHeaders: [],
    copied: false
  }
  formatHeaders = () => {
    return this.state.emailHeaders.map(h => `${h[0]} ${h[1]}`).join('\n')
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
            <div className='file-upload'>
              <FileUpload
                handleFile={(e) => this.handleFile(e)}
                clearFile={() => this.clearFile()}
              />
            </div>
            {this.state.emailHeaders.length > 0 && <div className='clipboard'>
              <CopyToClipboard text={this.formatHeaders()} onCopy={() => { console.log({ headers: this.state.emailHeaders }) && this.setState({ copied: true }) }}>
                <button>Copy to clipboard</button>
              </CopyToClipboard>
            </div>}
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
