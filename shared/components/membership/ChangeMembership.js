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

    updateMembership() {
        alert("I wish I could!")
    }

    render() {
        const { user } = this.props
        console.log(this.props.memberportal.toJS())
        var omemberportal = this.props.memberportal.toJS()
        var msg = omemberportal.update_member_msg
        var email = "k@p"
        var member_since = "ms"
        var address_line_1 = "a1"
        var address_line_2 = "a1"
        var city = "c"
        var state = "s"
        var country = "co"
        var postal_code = "pc"
        return (
            <div className="member-portal-container">
                <MembershipHeader user={user} />

                <div className="members-update-account-details-container">
                    <h3>Update Account Details</h3>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">Email:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput">{email}</div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">Member since:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput">{member_since}</div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">Address Line 1:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput"><input className="member-frm-input" value={address_line_1} /></div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">Address Line 2:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput"><input className="member-frm-input" value={address_line_2} /></div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">City:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput"><input className="member-frm-input" value={city} /></div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">State:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput"><input className="member-frm-input" value={state} /></div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">Postal code:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput"><input className="member-frm-input" value={postal_code} /></div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2 member-frm-label">Country:</div>
                        <div className="col-xs-12 col-sm-10"><div className="member-frm-ninput"><input className="member-frm-input" value={country} /></div></div>
                    </div>
                    <div className="row member-frm-inner">
                        <div className="col-xs-12 col-sm-2"></div>
                        <div className="col-xs-12 col-sm-10"><button onClick={this.updateMembership.bind(this)} className="member-frm-btn">Save</button></div>                        
                    </div>
                    <hr />
                    <p>{msg}</p>
                    <button className="member-frm-btn" onClick={this.changeMembership.bind(this)}>Change Membership</button>
                    <br/><br/>
                    <button className="member-frm-btn" onClick={this.cancelMembership.bind(this)}>Cancel Membership</button>
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
