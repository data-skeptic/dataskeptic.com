import React, { Component } from "react"
import DragAndDropFileUploadField from "./DragAndDropFileUploadField"

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

    const validFiles = files.map(file =>
      checker(file, {
        maxWidth,
        maxHeight
      })
    )

    return validFiles.length === files.length
  }

  checkBoth(file) {
    const { maxWidth, maxHeight } = this.props
    return true
  }

  checkWidth(file) {
    const { maxWidth } = this.props
    return true
  }

  checkHeight(file) {
    const { maxHeight } = this.props
    return true
  }

  render() {
    const { ...rest } = this.props
    return <DragAndDropFileUploadField {...rest} onDrop={this.handleDrop} />
  }
}
