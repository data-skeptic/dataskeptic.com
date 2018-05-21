import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import page from "../Layout/hoc/page";

class Logout extends Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.dispatch({
        type: 'LOGOUT'
      })
      axios.get('/api/v1/auth/logout')
    }

    return this.props.router.push('/')
  }

  render() {
    return <div className="center">...</div>
  }
}

export default page(
  connect(state => ({
    loggedIn: state.auth.getIn(['loggedIn'])
  }))(Logout),
  {
    title: 'Logout'
  }
)
