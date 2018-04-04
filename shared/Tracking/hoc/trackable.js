import React, { Component } from 'react'
import _ from 'lodash'
import ReactDOM from 'react/lib/ReactDOM'

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export default ComposedComponent => {
  class WrapperComponent extends Component {
    state = {
      reveal: false
    }
    saveRef = ref => (this.el = ReactDOM.findDOMNode(ref))
    handleScroll = () => {
      if (!this.el) return
      const visible = isElementInViewport(ReactDOM.findDOMNode(this.el))
      if (visible) {
        this.setState({ reveal: true })
        this.disableScroll()
      }
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
      this.disableScroll()
    }

    disableScroll() {
      window.removeEventListener('scroll', this.handleScroll)
    }

    constructor() {
      super()

      this.handleScroll = _.debounce(this.handleScroll, 300)
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          ref={this.saveRef}
          reveal={this.state.reveal}
        />
      )
    }
  }
  return WrapperComponent
}
