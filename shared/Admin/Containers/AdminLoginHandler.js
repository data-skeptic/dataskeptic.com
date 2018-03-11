import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../Actions/AdminActions'
import { push } from 'redux-react-router'

class AdminLoginHandler extends Component {
  constructor(props) {
    super(props)
    this.checkUser = this.checkUser.bind(this)
  }

  componentDidMount() {
    this.checkUser()
  }
  checkUser() {
    const { location } = this.props
    const user = JSON.parse(location.query.user)
    if (user.hasAccess) {
      this.props.login(user)
      this.props.history.push('/admin')
    }
  }

  render() {
    return <div>Loading...</div>
  }
}

export default connect(
  state => ({
    isAdmin: state.admin.isAdmin
  }),
  dispatch =>
    bindActionCreators(
      {
        login
      },
      dispatch
    )
)(AdminLoginHandler)
