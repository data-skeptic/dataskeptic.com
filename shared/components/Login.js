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
        if (this.props.user) {
            window.location.href = '/'
        }
    }

    static getPageMeta() {
        return {
            title: 'Login | Data Skeptic'
        }
    }

    login() {
        window.location.href = '/api/v1/auth/login/google/'
    }

    render() {
        const { user} = this.props

        return !user && (
            <div className="center">
                <code>{JSON.stringify(user)}</code>
                <div className="admin-auth-container">
                    {user
                        ? (
                        <div>
                            <h3>Please log in</h3>
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
        user: state.auth.getIn(['user']).toJS()
    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(Login);
