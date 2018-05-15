import React, { Component } from 'react'
import Popup from '../Components/Popup'
import { connect } from 'react-redux'
import {init, deinit, open, close, isOpen} from "../helpers/popup"

export default (WrappedComponent, options) => {
  
  class WrappedPopup extends Component {
    static defaultProps = {
      
    }
    
    componentWillMount() {
      this.props.dispatch(init(options.key))
    }
    
    componentWillUnmount() {
      this.props._dispatch(deinit(options.key))
    }
    
    render() {
      const { open,...rest } = this.props

      return (
        <Popup {...rest}>
          <code>{JSON.stringify({
            open
          })}</code>
          <WrappedComponent />
        </Popup>
      )
    }
  }

  return connect(state => {
    return {
      open: isOpen(state(options.key)) 
    }
  })(WrappedPopup)
}
