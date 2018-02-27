import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'

class MembershipHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props
        return (
            <div className="member-header">
                <div className="member-header-left">
                    <p>Hello, <b>{user.displayName}</b></p>
                </div>
                <div className="member-header-right">
                    <a href="/logout">Logout.</a>
                </div>
                <br/>
                <div className="membership-menu">
                    <Link to="/membership">Members home</Link>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <Link to="/membership/change">Change Membership</Link>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <Link to="/membership/analytics">Analytics</Link>
                </div>
                <br/>
                <br/>
                <div className="clear" />
            </div>
        )
    }
}

export default connect(
    (state) => ({
    })
)(MembershipHeader);

