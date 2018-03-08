import React, { Component } from "react"
import _ from 'lodash'
import DragAndDropFileUploadField from "./DragAndDropFileUploadField"

const isError = v => !_.isBoolean(v) && _isObject(v)

export default class ImageUploadField extends Component {
  naiveChecker = () => true
  handleDrop = files => {
    const { maxWidth, maxHeight } = this.props

    let checker = this.naiveChecker
    if (maxWidth && maxHeight) {
      checker = this.checkBoth
    } else if (maxWidth) {
      checker = this.checkWidth
    } else if (maxHeight) {
      checker = this.checkHeight
    }

    const acceptedFiles = []
    const rejectedFiles = []
    
    files.forEach(file => {
      const check = checker(file)
      if (isError(check)) {
        rejectedFiles.push({
          reason: check.reason,
          file
        })
      } else {
        acceptedFiles.push(file)
      }
    })
    
    return {acceptedFiles, rejectedFiles}
  }

  checkBoth = (file) => {
    const { maxWidth, maxHeight } = this.props
    return true
  }

  checkWidth = (file) => {
    const { maxWidth } = this.props
    return true
  }

  checkHeight = (file) => {
    const { maxHeight } = this.props
    return true
  }

  render() {
    const { ...rest } = this.props
    return <DragAndDropFileUploadField {...rest} onDrop={this.handleDrop} />
  }
}
