import React, { Component } from 'react'
import Popup from '../Components/Popup'
import { connect } from 'react-redux'
import { isFunction } from 'lodash'
import { init, deinit, close, isOpen } from '../helpers/popup'

export default (WrappedComponent, options) => {
  const { key, ...rest } = options

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

    render() {
      const { isOpen } = this.props

      return (
        <Popup {...rest} isOpen={isOpen} onClose={this.close}>
          <WrappedComponent onClose={this.close} />
        </Popup>
      )
    }
  }

  return connect(state => {
    const popups = state.popups

    return {
      isOpen: isOpen(popups, options.key)
    }
  })(WrappedPopup)
}
