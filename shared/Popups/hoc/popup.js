import React, { Component } from 'react'
import Popup from '../Components/Popup'
import { connect } from 'react-redux'

export default (WrappedComponent, options) => {
  
  debugger;
  
  class WrappedPopup extends Component {
    static defaultProps = {
      
    }
    
    render() {
      const { children, ...rest } = this.props

      return (
        <Popup {...rest}>
          <WrappedComponent />
        </Popup>
      )
    }
  }

  return connect(state => {
    return {
      
    }
  })(WrappedPopup)
}
