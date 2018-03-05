import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default (ComposedComponent) => {
  class WrapperComponent extends Component {
    constructor() {
      super()
      debugger;
      this.el = ReactDOM.getNode(ComposedComponent)
    }
    
    componentDidMount(){
      window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
      this.disableScroll()
    }
    
    disableScroll() {
      window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
      
    }
    

    render(){
      return <ComposedComponent {...this.props} />
    }
  }
  return WrapperComponent;
}
