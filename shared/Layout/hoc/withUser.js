import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import page from './page'
import { connect } from 'react-redux'

export default WrappedComponent => {
  const withUser = class WithUser extends Component {
    render() {
      const { user, ...rest } = this.props
      return <WrappedComponent {...rest} user={user} />
    }
  }

  return
  connect(state => ({
    user: state.auth.getIn(['user']).toJS()
  }))(withUser)
}
