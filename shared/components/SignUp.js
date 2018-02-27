import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {changePageTitle} from '../Layout/Actions/LayoutActions';
import SignUpForm from "./SignUpForm";
import {Link} from "react-router";
import axios from "axios";

const SIGNUP_ENDPOINT = '/api/v1/auth/signup/'

class SignUp extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this)
        this.state = {
            error: ''
        }
    }

    componentWillMount() {
        const {title} = SignUp.getPageMeta();
        this.props.dispatch(changePageTitle(title))
    }

    componentDidMount() {
        if (this.props.loggedIn) {
	        return this.props.history.push('/membership')
        }
    }

    static getPageMeta() {
        return {
            title: 'Sign Up | Data Skeptic'
        }
    }

    login = (data) => {
        this.setState({error: ''})
        axios.post(SIGNUP_ENDPOINT, data).then((result) => {
            if (result.data.success) {
	              return this.props.history.push('/login')
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
                            <h3>Sign Up</h3>
                            <div className="login-form-area">
                                <div className="row">
                                    <SignUpForm btnWrapperClasses="col-md-12" onSubmit={this.login}/>
                                    {error && <p className="error-message">{error}</p>}
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
)(SignUp);
