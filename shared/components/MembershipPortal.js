import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Loading from '../Common/Components/Loading'
import { Link } from 'react-router'
import MembershipHeader from './membership/MembershipHeader'
import ChangeMembership from './membership/ChangeMembership'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class MembershipPortal extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {title} = MembershipPortal.getPageMeta();
        this.props.dispatch(changePageTitle(title))
    }

    componentDidMount() {
        var dispatch = this.props.dispatch
        if (!this.props.loggedIn) {
            window.location.href = '/login'
        }
        var user = this.props.user
        var p = {dispatch, user}
        console.log("DISPATCHING")
        dispatch({type: "CHECK_MEMBERSHIP", payload: p })      
    }

    static getPageMeta() {
        return {
            title: 'Membership Portal | Data Skeptic'
        }
    }

    render() {
        const { user, loggedIn } = this.props
        var pmembership = this.props.memberportal.toJS()
        var mode = pmembership['mode']
        console.log(mode)
        if (!loggedIn) {
            return (
                <div className="member-not-found-outer">
                    <div className="member-not-found">
                        <p>You are not logged in.  Please start with that.</p>
                        <a href="/login" />
                    </div>
                </div>
            )
        }
        if (mode == "loading") {
            return <Loading />
        }
        if (mode == "not-found") {
            return (
                <div className="member-not-found-outer">
                    <div className="member-not-found">
                        <h2>Logged in!</h2>
                        <p>You are now logged in to dataskeptic.com.  Today, the benefits of your account are only useful if you're a Data Skeptic Member, although features for everyone will come soon.</p>
                        <p>We are unable to connect the account you logged in with ({user.email}) to an active membership account.  There are two possible reasons for this:</p>
                        <p><b>A)</b> You are not a Data Skeptic Member.  Easy solution: <a href="https://dataskeptic.com/members">sign up here</a>.</p>
                        <p><b>B)</b> Our database does not have your login account linked to your membership account.  In this case, please email <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a> and let us know what email account we should link you to.</p>
                        <a href="/logout">Logout.</a>
                    </div>
                </div>
            )            
        }

        return (
            <div className="member-portal-container">
                <MembershipHeader user={user} />

                <div className="members-corner">
                    <div className="members-corner-body">
                        <div className="members-corner-image">
                            <img src="https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png" /><br/>
                            <i>Kyle Polich, executive producer</i>
                        </div>
                        <h4>Member's notes</h4>
                        <p>Happy 2018 and thank you for your support of Data Skeptic!</p>
                        <p>This humble page you're viewing now is a work in progress, but one that we'll be making considerable improvements to in the coming months.  We're waiting on all your member surveys to be returned to help us set priorities.  I'm going to leave this "Member's Corner" section at the top of your login and provide small updates and behind-the-scenes details.  If you're interested in that, check back here often for updates.</p>
                        <p>As we launch today, there's two useful features in your Member Portal:</p>
                        <p><b>Change membership</b> - Change membership level or cancel (gasp!)</p>
                        <p><b>Podcast Analytics</b> - A few details about which blog posts have been popular recently.</p>
                    </div>
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
)(MembershipPortal);
