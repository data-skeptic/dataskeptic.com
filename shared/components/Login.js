import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';
import LoginForm from "./LoginForm";
import {Link} from "react-router";
import axios from "axios";

const LOGIN_ENDPOINT = '/api/v1/auth/login/'

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this)
        this.state = {
            error: ''
        }
    }

    componentWillMount() {
        const {title} = Login.getPageMeta();
        this.props.dispatch(changePageTitle(title))
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            window.location.href = '/membershipPortal'
        }
    }

    static getPageMeta() {
        return {
            title: 'Login | Data Skeptic'
        }
    }

    followLogin() {
        window.location.href = '/api/v1/auth/login/google/'
    }

    login = (data) => {
        this.setState({error: ''})
        axios.post(LOGIN_ENDPOINT, data).then((result) => {
            if (result.data.success) {
                this.props.dispatch({
                  type: 'AUTH_USER_SUCCESS',
                  payload: { data: result.data.user }
                })
	              return this.props.history.push('/membershipPortal')
            } else {
                this.setState({error: result.data.message})
            }
        })
    }

    render() {
        const { loggedIn } = this.props
        const { error } = this.state;

        return (
            <div className="center">
                <div className="admin-auth-container">
                    {!loggedIn
                        ? (
                        <div>
                            <h3>Membership login</h3>
                            <p>For people with active Data Skeptic memberships, please log in via the botton below to manage your account and access exclusive features.</p>

                            <div className="login-form-area">
                                <div className="row">
                                    <LoginForm btnWrapperClasses="col-md-12" onSubmit={this.login}/>
                                    {error && <p className="error-message">{error}</p>}
                                </div>
                                <div className="or">
                                    <hr/>
                                    <span>or</span>
                                </div>
                                <div className="buttons col-xs-12 col-sm-12">
                                    <button className="btn google-btn" onClick={this.followLogin}>Log in with <b>Google</b></button>
                                    <Link className="btn signup-btn" to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                        )
                        : (
                        <div>
                            <h3>Login Success</h3>
                        </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn'])
    })
)(Login);
