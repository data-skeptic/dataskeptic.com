import React, { Component } from 'react'
import Popup from '../Components/Popup'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isFunction } from 'lodash'
import {
  init,
  deinit,
  close,
  accept,
  isOpen,
  isAccepted
} from '../helpers/popup'

import CloseButton, { Button as ButtonWrapper } from '../Components/CloseButton'

export default (WrappedComponent, options) => {
  const { key, callToAction, message, ...rest } = options

  class WrappedPopup extends Component {
    static defaultProps = {}

    componentDidMount() {
      this.props.dispatch(init(key))
    }

    componentWillUnmount() {
      this.props.dispatch(deinit(key))
    }

    close = () => {
      this.props.dispatch(close(options.key))
      if (this.props.onClose) {
        this.props.onClose()
      }
    }

    accept = () => {
      this.props.dispatch(accept(options.key))
    }

    render() {
      const { isOpen, isAccepted, isMobile } = this.props

      const openOnMobile = isMobile && (isOpen && !isAccepted)
      const openAndAcceptedOnMobile = isMobile && isOpen && isAccepted
      const open = isMobile ? openAndAcceptedOnMobile : isOpen

      return (
        <div>
          {openOnMobile && (
            <MobilePopup>
              <CloseButton onClick={this.close} />
              <MobileContent>
                <Message>{message}</Message>
                <CallToAction onClick={this.accept}>
                  {callToAction}
                </CallToAction>
              </MobileContent>
            </MobilePopup>
          )}

          <Popup
            {...rest}
            isOpen={open}
            onClose={this.close}
            isMobile={isMobile}
          >
            <WrappedComponent onClose={this.close} />
          </Popup>
        </div>
      )
    }
  }

  return connect(state => {
    const popups = state.popups

    return {
      isOpen: isOpen(popups, options.key),
      isAccepted: isAccepted(popups, options.key),
      isMobile: state.layout.get('isMobile')
    }
  })(WrappedPopup)
}

const MobilePopup = styled.div`
  position: fixed;
  z-index: 8;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: auto;

  min-height: 80px;

  background-color: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  box-shadow: 0px 1px 15px rgba(146, 146, 146, 0.1);
  border-radius: 14px 0px 0px 0px;

  ${ButtonWrapper} {
    right: 18px;
  }
`

const MobileContent = styled.div`
  padding: 16px 18px;
`

const Message = styled.p`
  color: #2d1454;
  font-size: 22px;
  line-height: 31px;
  margin-bottom: 24px;
  padding-right: 60px;
`

const CallToAction = styled.button`
  width: 120px;
  height: 40px;
  background: #f0d943;
  font-size: 16px;
  color: #333333;
  border: none;
  border-radius: 5px;
`
