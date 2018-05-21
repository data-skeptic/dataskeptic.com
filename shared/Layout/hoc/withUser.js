import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'

const isAdmin = user => user && user.type === 'admin'

export default WrappedComponent => {
  const withUser = class WithUser extends Component {
    render() {
      const { isAuthorized, loggedIn, user, ...rest } = this.props

      return (
        <WrappedComponent
          {...rest}
          isAuthorized={isAuthorized}
          loggedIn={loggedIn}
          user={user}
          isAdmin={isAdmin(user)}
        />
      )
    }
  }

  return connect(state => ({
    isAuthorized: state.site.getIn(['sessionId']),
    loggedIn: state.auth.get('loggedIn'),
    user: state.auth.getIn(['user']).toJS()
  }))(withUser)
}
