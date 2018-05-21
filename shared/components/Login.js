import React, { Component } from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router'
import axios from 'axios'
import page from '../Layout/hoc/page'
import withUser from '../Layout/hoc/withUser'

const LOGIN_ENDPOINT = '/api/v1/auth/login/'

class Login extends Component {
  login = data => {
    this.setState({ error: '' })
    axios.post(LOGIN_ENDPOINT, data).then(result => {
      if (result.data.success) {
        this.props.dispatch({
          type: 'AUTH_USER_SUCCESS',
          payload: { data: result.data.user }
        })
        return this.props.router.push('/membership')
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

  googleLogin() {
    window.location.href = '/api/v1/auth/login/google/'
  }

  linkedinLogin() {
    window.location.href = '/api/v1/auth/login/linkedin/'
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      window.location.href = '/membership'
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
              <h3>Membership login</h3>
              <p>
                For people with active Data Skeptic memberships, please log in
                via the botton below to manage your account and access exclusive
                features.
              </p>

              <div className="login-form-area">
                <div className="row">
                  <LoginForm
                    btnWrapperClasses="col-md-12"
                    onSubmit={this.login}
                  />
                  {error && <p className="error-message">{error}</p>}

                  <div className="buttons col-xs-12 col-sm-12">
                    <button
                      className="btn small-btn google-btn"
                      onClick={this.googleLogin}
                    >
                      Log in with <b>Google</b>
                    </button>
                    <button
                      className="btn small-btn linkedin-btn"
                      onClick={this.linkedinLogin}
                    >
                      Log in with <b>Linkedin</b>
                    </button>
                  </div>
                </div>
                <div className="or">
                  <hr />
                  <span>or</span>
                </div>
                <div className="buttons col-xs-12 col-sm-12">
                  <Link className="btn signup-btn" to="/signup">
                    Sign Up
                  </Link>
                </div>
                <div className="buttons col-xs-12 col-sm-12" />
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

export default withUser(
  page(Login, {
    title: 'Admin Login'
  })
)
