import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

import CloseButton, { Button as ButtonWrapper } from '../CloseButton'

const DEFAULT_STYLES = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const MOBILE_DEFAULT_STYLES = {
  content: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transform: `translate(0)`,
    borderRadius: '0px'
  }
}

if (typeof window !== 'undefined') {
  Modal.setAppElement('#react-view')
}

export default class Popup extends Component {
  static defaultProps = {
    isOpen: false,
    isMobile: false,
    onClose: () => {}
  }

  render() {
    const { children, isOpen, onClose, isMobile } = this.props
    const customStyles = isMobile ? MOBILE_DEFAULT_STYLES : DEFAULT_STYLES
    
    const width = isMobile ? `auto` : this.props.width
    const height = isMobile ? `auto` : this.props.height
    
    const styles = {
      ...customStyles,
      content: {
        ...customStyles.content,
        width,
        height
      }
    }

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={styles}
        className="datas-popup"
        overlayClassName="datas-overlay"
      >
        <In>
        <CloseButton onClick={onClose} />
        <Container>{children}</Container>
        </In>
      </Modal>
    )
  }
}

const In = styled.div`
  ${ButtonWrapper} {
    top: 22px;
    right: 22px;
  }
`

const Container = styled.section`
  padding: 16px 18px;
`
