import React, { Component } from 'react'
import Modal from 'react-modal'


export default class Popup extends Component {
  defaultProps = {
    isOpen: false,
    onClose: () => {}
  }
  
  render() {
    const { children, isOpen, onClose } = this.props
    
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose}>{children}</Modal>
    )
  }
  
}
