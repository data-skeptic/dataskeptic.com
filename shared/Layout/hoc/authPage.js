import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import page from './page'
import { connect } from 'react-redux'
import {
  isAdministratorUser,
  isStandartUser
} from '../../Auth/Helpers/UserTypes'
import withUser from './withUser'

export default (WrappedComponent, options = {}) => {
  const { redirectTo = '/login' } = options

  const authPage = class AuthPage extends Component {
    componentWillMount() {
      if (!this.hasAccess(this.props.user)) {
        console.info('user have no access to the page')
        return this.props.router.push(redirectTo)
      }
    }

    hasAccess = user =>
      (!isEmpty(user) && isStandartUser(user.type)) ||
      isAdministratorUser(user.type)

    render() {
      const { ...rest } = this.props

      return this.hasAccess(this.props.user) && <WrappedComponent {...rest} />
    }
  }

  return withUser(
    page(
      connect(state => ({
        admin: state.admin,
        isAdmin: state.admin.isAdmin
      }))(authPage),
      options
    )
  )
}
