import React, { Component } from 'react'
import Popup from '../Components/Popup'
import { connect } from 'react-redux'

export default function(options) {
  class WrappedPopup extends Component {
    static defaultProps = {
      
    }
    
    render() {
      const { ...rest } = this.props

      return (
        <Popup {...rest} />
      )
    }
  }

  return connect(state => {
    return {
      
      
      
      
      
      
      
    }
  })(WrappedPopup)
}
