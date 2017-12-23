import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class Logout extends Component {

    componentWillMount() {
        const {title} = Logout.getPageMeta();
        this.props.changePageTitle(title);
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            window.location.href = '/api/v1/auth/logout'
        } else {
            window.location.href = '/'
        }
    }

    static getPageMeta() {
        return {
            title: 'Logout | Data Skeptic'
        }
    }

    render() {
        return (
            <div className="center">
                ...
            </div>
        )
    }
}

export default connect(
    (state) => ({
        loggedIn: state.auth.getIn(['loggedIn'])
    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(Logout);
