import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class PostBodyContainer extends Component {
  constructor() {
    super()
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).innerHTML = ''
  }

  componentDidUpdate() {
    // force html update
    if (this.props.content !== ReactDOM.findDOMNode(this).innerHTML) {
      ReactDOM.findDOMNode(this).innerHTML = this.props.content
    }
  }

  render() {
    const { content = '' } = this.props
    // return <div></div>;
    return <div key={Date()} dangerouslySetInnerHTML={{ __html: content }} />
  }
}

export default PostBodyContainer
