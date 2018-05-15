import React, { Component } from 'react'
import Popup from '../Components/Popup'
import { connect } from 'react-redux'
import {init, deinit, open, close, isOpen} from "../helpers/popup"

export default (WrappedComponent, options) => {
  const {key, ...rest} = options
  
  class WrappedPopup extends Component {
    static defaultProps = {
      
    }
    
    componentDidMount() {
      this.props.dispatch(init(key))
    }
    
    componentWillUnmount() {
      this.props.dispatch(deinit(key))
    }
    
    close = () => this.props.dispatch(close(options.key))
    
    render() {
      const { isOpen } = this.props

      return (
        <Popup {...rest} isOpen={isOpen} onClose={this.close}>
          <WrappedComponent  />
        </Popup>
      )
    }
  }

  return connect(state => {
    const popups = state.popups
    
    return {
      isOpen: true//isOpen(popups, options.key) 
    }
  })(WrappedPopup)
}
