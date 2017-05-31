import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Container from '../../../Layout/Components/Container/Container';
import Content from '../../../Layout/Components/Content/Content';

import {changePageTitle} from '../../../Layout/Actions/LayoutActions';

const LOGIN_URL = ''
const LINKEDIN_LOGIN_URL = '/auth/login/linkedin';

class Login extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {title} = Login.getPageMeta();
        this.props.changePageTitle(title);
    }

    static getPageMeta() {
        return {
            title: 'Login | Data Skeptic'
        }
    }

    render() {
        return (
            <div className="members-login-page">
                <Container>
                    <h1>Login</h1>

                    <button onClick={() => window.location = LINKEDIN_LOGIN_URL}>LinkedIn Login</button>
                </Container>
            </div>
        )
    }

}

export default connect(
    state => ({

    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(Login)

