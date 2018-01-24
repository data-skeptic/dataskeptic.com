import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';
import LoginForm from "./LoginForm";
import {Link} from "react-router";

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this)
    }

    componentWillMount() {
        const {title} = Login.getPageMeta();
        this.props.changePageTitle(title);
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
        alert(JSON.stringify(data))
    }

    render() {
        const { loggedIn, user } = this.props

        return (
            <div className="center">
                <div className="admin-auth-container">
                    {!loggedIn
                        ? (
                        <div>
                            <h3>Membership login</h3>
                            <p>For people with active Data Skeptic memberships, please log in via the botton below to manage your account and access exclusive features.</p>

                            <div className="login-form-area">
                                <div className="row"><LoginForm btnWrapperClasses="col-md-12" onSubmit={this.login}/></div>
                                <div className="or">
                                    <hr/>
                                    <span>or</span>
                                </div>
                                <div className="buttons col-xs-12 col-sm-12">
                                    <button className="btn google-btn" onClick={this.followLogin}>Log in with <b>Google</b></button>
                                    <Link className="btn signup-btn" to="">Sign Up</Link>
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
    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(Login);
