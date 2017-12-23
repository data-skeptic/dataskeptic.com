import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class MembershipPortal extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const {title} = MembershipPortal.getPageMeta();
        this.props.changePageTitle(title);
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            window.location.href = '/login'
        }
    }

    static getPageMeta() {
        return {
            title: 'Membership Portal | Data Skeptic'
        }
    }

    render() {
        const { user, loggedIn } = this.props

        return loggedIn && (
            <div className="center">
                <h2>Hello, <b>{user.displayName}</b></h2>

                <a href="/logout">Logout.</a>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn']),
    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(MembershipPortal);
