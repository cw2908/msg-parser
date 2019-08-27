import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import FileUpload from './components/FileUpload'
import Table from './components/Table'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'

const VIEWS = {
  header: 'HEADER',
  body: 'BODY'
}
class App extends Component {
  state = {
    emailHeaders: [],
    copied: false,
    view: VIEWS.header
  }
  formatHeaders = () => {
    return this.state.emailHeaders.map(h => `${h[0]} ${h[1]}`).join('\n')
  }
  handleFile = async e => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file)
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    const response = await axios.post('msg', formData, headers)
    const responseBody = await response.data
    console.info({ responseBody })
    this.setState({
      emailHeaders: Object.entries(responseBody.headers),
      emailBody: responseBody.body
    })
  }

  renderHeaders () {
    const { emailHeaders } = this.state
    return (
      <div>
        {emailHeaders.length > 0 && (
          <div className='centered'>
            <CopyToClipboard
              text={this.formatHeaders()}
              onCopy={() => {
                console.log({ headers: emailHeaders }) &&
                  this.setState({ copied: true })
              }}
            >
              <button>Copy to clipboard</button>
            </CopyToClipboard>
          </div>
        )}
        <Table headings={['Header', 'Value']} rows={emailHeaders} />
      </div>
    )
  }

  renderBody () {
    const { emailBody } = this.state
    console.log('Rendering Email Body')
    console.log({ emailBody })
    return (
      <div className='emailBody'>
        <pre>{emailBody}</pre>
      </div>
    )
  }

  toggleView () {
    this.state.view == VIEWS.header
      ? this.setState({ view: VIEWS.body })
      : this.setState({ view: VIEWS.header })
  }

  render () {
    return (
      <div>
        <main>
          <div className='upload-container'>
            <div className='file-upload'>
              <FileUpload
                handleFile={e => this.handleFile(e)}
                clearFile={() => this.clearFile()}
              />
            </div>
            {this.state.emailHeaders && this.state.emailBody && (
              <div className='centered'>
                <button className='centered' onClick={() => this.toggleView()}>
                  Switch View
                </button>
              </div>
            )}
            {this.state.view == VIEWS.header
              ? this.renderHeaders()
              : this.renderBody()}
          </div>
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
