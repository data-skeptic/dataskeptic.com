import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Loading from '../../Common/Components/Loading'
import ContactFormContainer from '../../Contacts/Containers/ContactFormContainer/ContactFormContainer'
import { Link } from 'react-router'
import MembershipHeader from './MembershipHeader'

class MembershipInbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, loggedIn } = this.props
        return (
            <div className="member-portal-container">
                <MembershipHeader user={user} />

                <div className="members-corner">
                    <h3>Priority Inbox</h3>
                    <ContactFormContainer />
                </div>

            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn']),
        memberportal: state.memberportal,
    })
)(MembershipInbox);
