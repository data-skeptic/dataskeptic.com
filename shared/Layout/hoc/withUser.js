import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import axios from 'axios'

const isAdmin = user => user && user.type === 'admin'

export default WrappedComponent => {
  const withUser = class WithUser extends Component {
    componentDidMount() {
      console.log('WithUser:componentDidMount')
      if (!this.props.loggedIn) {
        axios.get('/api/v1/auth/usertest').then(res => {
          console.log('withUser:AUTH_USER_SUCCESS res.data = ', res.data)
          if (res.data && res.data !== "") {
            this.props.dispatch({
              type: 'AUTH_USER_SUCCESS',
              payload: { data: res.data }
            })
          }
        }).catch(err => console.warn(err))
      }
    }

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

  return connect(state => {
    console.log({loggedIn: state.auth.get('loggedIn')})
    return {
      isAuthorized: state.site.getIn(['sessionId']),
      loggedIn: state.auth.get('loggedIn'),
      user: state.auth.getIn(['user']).toJS()
    }
  })(withUser)
}
