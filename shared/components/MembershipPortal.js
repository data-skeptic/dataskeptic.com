import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Loading from '../Common/Components/Loading'
import ContactFormContainer from '../Contacts/Containers/ContactFormContainer/ContactFormContainer'

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
            title: `Membership Portal | Data Skeptic`
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
                        <h2>Membership not found</h2>
                        <p>We are unable to connect the account you logged in with ({user.email}) to an active membership account.  There are two possible reasons for this:</p>
                        <p><b>A)</b> You are not a Data Skeptic Member.  Easy solution: <a href="https://dataskeptic.com/members">sign up here</a>.</p>
                        <p><b>B)</b> Our database does not have your login account linked to your membership account.  In this case, please email <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a> and let us know what email account we should link you to.</p>
                        <a href="/logout">Logout.</a>
                    </div>
                </div>
            )            
        }

        return (
            <div className="center">
                <div className="member-header">
                    <div className="member-header-left">
                        <p>Hello, <b>{user.displayName}</b></p>
                    </div>
                    <div className="member-header-right">
                        <a href="/logout">Logout.</a>
                    </div>
                </div>
                <div className="members-corner">
                    <div className="members-corner-image">
                        <img src="https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png" /><br/>
                        <i>Kyle Polich, executive producer</i>
                    </div>
                    <div className="members-corner-body">
                        <h2>Member's Corner</h2>
                        <p>Happy 2018 and thank you for your support of Data Skeptic!</p>
                        <p>This humble page you're viewing now is a work in progress, but one that we'll be making considerable improvements to in the coming months.  We're waiting on all your member surveys to be returned to help us set priorities.  I'm going to leave this "Member's Corner" section at the top of your login and provide small updates and behind-the-scenes details.  If you're interested in that, check back here often for updates.</p>
                        <p>As we launch today, there's three useful features in your Member Portal:</p>
                        <p><b>Change membership</b> - Change membership level or cancel (gasp!)</p>
                        <p><b>Priority inbox</b> - Get in contact with me fast (member's only)</p>
                        <p><b>Podcast Analytics</b> - A few details about which episodes are most popular</p>
                    </div>
                    <div className="clear"></div>
                </div>

                <br/><br/>

                <div className="membership-body">
                    <div className="membership-menu">
                        <a href="#cm">Change Membership</a>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <a href="#pi">Priority Inbox</a>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <a href="#a">Analytics</a>
                    </div>

                    <a name="cm" />
                    <h3>Change Membership</h3>
                    <p>TODO: Change amount</p>
                    <p>TODO: Cancel membership</p>

                    <a name="pi" />
                    <h3>Priority Inbox</h3>
                    <ContactFormContainer />

                    <a name="a" />
                    <h3>Analytics</h3>
                    <p>The plot below gives some insight into how popular recent episodes of the podcast have been.  You can learn more about the methodology, implementation, and interpretation of the plot on [this blog post about it](https://dataskeptic.com/blog/meta/2018/podcast-download-statistics).</p>
                    <p>TODO</p>
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
