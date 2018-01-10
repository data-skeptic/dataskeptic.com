import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Loading from '../../Common/Components/Loading'
import { Link } from 'react-router'
import MembershipHeader from './MembershipHeader'

class ChangeMembership extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var dispatch = this.props.dispatch
        const { user } = this.props
        var email = user.email
    }

    cancelMembership() {
        var dispatch = this.props.dispatch
        const { user } = this.props
        var email = user.email
        dispatch({type: "CANCEL_MEMBERSHIP", payload: {dispatch, email} })
        var msg = "Processing cancellation..."
        dispatch({type: "UPDATE_MEMBERSHIP_MSG", payload: {msg} })
    }

    changeMembership() {
        var dispatch = this.props.dispatch
        const { user } = this.props
        var email = user.email
        dispatch({type: "CHANGE_MEMBERSHIP", payload: {dispatch, email} })
        var msg = "Oh no!  Sorry, we didn't implement that yet!  You have two options 1) Cancel your current membership and re-subscribe 2) Contact orders@dataskeptic.com with your specific request and we can help."
        dispatch({type: "UPDATE_MEMBERSHIP_MSG", payload: {msg} })
    }

    render() {
        const { user } = this.props
        console.log(this.props.memberportal.toJS())
        var omemberportal = this.props.memberportal.toJS()
        var msg = omemberportal.update_member_msg
        return (
            <div className="member-portal-container">
                <MembershipHeader user={user} />

                <div className="members-corner">
                    <h3>Change Membership</h3>
                    <p>{msg}</p>
                    <button onClick={this.changeMembership.bind(this)}>Change Membership</button>
                    <br/><br/>
                    <button onClick={this.cancelMembership.bind(this)}>Cancel Membership</button>
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
)(ChangeMembership);
