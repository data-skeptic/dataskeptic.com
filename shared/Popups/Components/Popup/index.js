import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

import CloseButton from '../CloseButton'

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

if (typeof window !== 'undefined') {
  Modal.setAppElement('#react-view')
}

export default class Popup extends Component {
  defaultProps = {
    isOpen: false,
    onClose: () => {}
  }

  render() {
    const { children, isOpen, onClose, width, height } = this.props
    const styles = {
      ...DEFAULT_STYLES,
      content: {
        ...DEFAULT_STYLES.content,
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
        <CloseButton />
        <Container>{children}</Container>
      </Modal>
    )
  }
}

const Container = styled.section`
  padding: 16px 18px;
`
