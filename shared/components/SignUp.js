import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'
import axios from 'axios'
import page from "../Layout/hoc/page";
import withUser from "../Layout/hoc/withUser";

const SIGNUP_ENDPOINT = '/api/v1/auth/signup/'

class SignUp extends Component {
  login = data => {
    this.setState({ error: '' })
    axios.post(SIGNUP_ENDPOINT, data).then(result => {
      if (result.data.success) {
        return this.props.router.push('/login')
      } else {
        this.setState({ error: result.data.message })
      }
    })
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.state = {
      error: ''
    }
  }

  static getPageMeta() {
    return {
      title: 'Sign Up | Data Skeptic'
    }
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      return this.props.router.push('/membership')
    }
  }

  render() {
    const { loggedIn } = this.props
    const { error } = this.state

    return (
      <div className="center">
        <div className="admin-auth-container">
          {!loggedIn ? (
            <div>
              <h3>Sign Up</h3>
              <div className="login-form-area">
                <div className="row">
                  <SignUpForm
                    btnWrapperClasses="col-md-12"
                    onSubmit={this.login}
                  />
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3>Login Success</h3>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withUser(page(connect(state => ({}))(SignUp), {
  title: `Sign Up`
}))
