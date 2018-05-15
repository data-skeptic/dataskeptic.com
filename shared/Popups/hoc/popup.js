import React, { Component } from 'react'
import Popup from '../Components/Popup'
import { connect } from 'react-redux'
import {init, deinit, open, close, isOpen} from "../helpers/popup"

export default (WrappedComponent, options) => {
  
  class WrappedPopup extends Component {
    static defaultProps = {
      
    }
    
    componentDidMount() {
      this.props.dispatch(init(options.key))
    }
    
    componentWillUnmount() {
      this.props.dispatch(deinit(options.key))
    }
    
    close = () => this.props.dispatch(close(options.key))
    
    render() {
      const { isOpen,...rest } = this.props

      return (
        <Popup {...rest} isOpen={isOpen} onClose={this.close}>
          <code>{JSON.stringify({
            isOpen
          })}</code>
          <WrappedComponent  />
        </Popup>
      )
    }
  }

  return connect(state => {
    const popups = state.popups
    
    return {
      isOpen: true //isOpen(popups, options.key) 
    }
  })(WrappedPopup)
}
