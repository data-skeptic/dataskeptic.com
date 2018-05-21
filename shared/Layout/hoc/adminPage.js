import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import page from './page'
import { isAdministratorUser } from '../../Auth/Helpers/UserTypes'
import withUser from './withUser'

export default (WrappedComponent, options = {}) => {
  const { redirectTo = '/404' } = options

  const adminPage = class AdminPage extends Component {
    componentWillMount() {
      if (!this.hasAccess(this.props.user)) {
        console.info('user have no admin access to the page')
        return this.props.router.push(redirectTo)
      }
    }

    hasAccess = user => !isEmpty(user) && isAdministratorUser(user.type)

    render() {
      const { ...rest } = this.props
      return (
        this.hasAccess(this.props.user) && (
          <WrappedComponent {...rest} hasAccess={this.hasAccess} />
        )
      )
    }
  }

  return withUser(page(adminPage, options))
}
