import React, { Component } from "react"
import _ from "lodash"
import DragAndDropFileUploadField from "./DragAndDropFileUploadField"

export default class ImageUploadField extends Component {
  defaultProps = {
    maxWidth: null,
    strictWidth: null,
    maxHeight: null,
    strictHeight: null
  }

  measure = file =>
    new Promise(res => {
      const img = new Image()
      img.onload = function() {
        const size = {
          width: this.width,
          height: this.height
        }

        res(size)
      }
      img.src = file.preview
    })

  naiveChecker = () => true
  handleDrop = async files => {
    let checker = this.getChecker()

    const acceptedFiles = []
    const rejectedFiles = []

    const sizes = await Promise.all(files.map(file => this.measure(file)))
    files.forEach((file, index) => {
      const size = sizes[index]
      const valid = checker(size)

      if (!valid) {
        rejectedFiles.push({
          reason: `File dimension is to big ${size.width}x${size.height}.`,
          file
        })
      } else {
        acceptedFiles.push(file)
      }
    })

    return { acceptedFiles, rejectedFiles }
  }
  checkStrictWidth = ({ width }) => width === this.props.strictWidth
  checkMaxWidth = ({ width }) => width <= this.props.maxWidth
  checkMaxHeight = ({ height }) => height <= this.props.maxHeight
  checkStrictHeight = ({ height }) => height === this.props.strictHeight

  getChecker() {
    const { maxWidth, strictWidth, maxHeight, strictHeight } = this.props

    let widthChecker = this.naiveChecker
    let heightChecker = this.naiveChecker

    if (maxWidth) {
      widthChecker = this.checkMaxWidth
    } else if (strictWidth) {
      widthChecker = this.checkStrictWidth
    }

    if (maxHeight) {
      heightChecker = this.checkMaxHeight
    } else if (strictHeight) {
      heightChecker = this.checkStrictHeight
    }
    
    return size => {
      return widthChecker(size) && heightChecker(size)
    }
  }

  render() {
    const { ...rest } = this.props
    return <DragAndDropFileUploadField {...rest} onDrop={this.handleDrop} />
  }
}
