import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

import { changePageTitle } from '../Layout/Actions/LayoutActions'

class Logout extends Component {
  static getPageMeta() {
    return {
      title: 'Logout | Data Skeptic'
    }
  }

  componentWillMount() {
    const { title } = Logout.getPageMeta()
    this.props.dispatch(changePageTitle(title))
  }

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

export default connect(state => ({
  loggedIn: state.auth.getIn(['loggedIn'])
}))(Logout)
