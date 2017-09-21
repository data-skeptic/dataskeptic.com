import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isRoutingToDifferentPage } from '../redux/modules/router'

const routingDimmer = WrappedComponent => {
  @connect(state => ({
    changingPage: isRoutingToDifferentPage(state)
  }))
  class RoutingDimmer extends Component {
    render() {
      const { changingPage, ...rest } = this.props
      const style = changingPage ? { opacity: 0.4 } : {}
      return (
        <div style={style}>
          <WrappedComponent {...rest} />
        </div>
      )
    }
  }

  return RoutingDimmer
}

export default routingDimmer
