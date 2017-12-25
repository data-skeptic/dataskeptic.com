import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

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
            title: `Login | Data Skeptic`
        }
    }

    login() {
        window.location.href = '/api/v1/auth/login/google/'
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
                            <button className="btn btn-primary" onClick={this.login}>Log in</button>
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
