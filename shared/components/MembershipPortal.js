import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import Loading from '../Common/Components/Loading'
import { Link } from 'react-router'
import MembershipHeader from './membership/MembershipHeader'
import authPage from '../Layout/hoc/authPage'

class MembershipPortal extends Component {
  componentDidMount() {
    const { user, dispatch } = this.props
    const p = { dispatch, user }

    dispatch({ type: 'CHECK_MEMBERSHIP', payload: p })

    if (isEmpty(window.purechatApi)) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script['data-cfasync'] = false
      script.innerHTML =
        "window.purechatApi = { l: [], t: [], on: function () { this.l.push(arguments); } }; (function () { var done = false; var script = document.createElement('script'); script.async = true; script.type = 'text/javascript'; script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript'; document.getElementsByTagName('HEAD').item(0).appendChild(script); script.onreadystatechange = script.onload = function (e) { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { var w = new PCWidget({c: 'dddd526a-c56a-4f86-8985-6e36310b9b21', f: true }); done = true; } }; })();"
      document.body.appendChild(script)
    }
  }

  render() {
    const { user, loggedIn, children } = this.props
    const pmembership = this.props.memberportal.toJS()
    const mode = pmembership['mode']

    if (children) {
      return children
    }

    if (mode === 'loading') {
      return <Loading />
    }
    if (mode === 'not-found') {
      return (
        <div className="member-not-found-outer">
          <div className="member-not-found">
            <h2>Logged in!</h2>
            <p>
              You are now logged in to dataskeptic.com. Today, the benefits of
              your account are only useful if you're a Data Skeptic Member,
              although features for everyone will come soon.
            </p>
            <p>
              We are unable to connect the account you logged in with ({
                user.email
              }) to an active membership account. There are two possible reasons
              for this:
            </p>
            <p>
              <b>A)</b> You are not a Data Skeptic Member. Easy solution:{' '}
              <a href="https://dataskeptic.com/members">sign up here</a>.
            </p>
            <p>
              <b>B)</b> Our database does not have your login account linked to
              your membership account. In this case, please email{' '}
              <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a>{' '}
              and let us know what email account we should link you to.
            </p>
            <Link to="/logout">Logout.</Link>
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
              <img src="https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png" />
              <br />
              <i>Kyle Polich, executive producer</i>
            </div>
            <h4>Member's notes</h4>
            <p>Welcome to the Members' Portal</p>
            <p>
              This humble page you're viewing now is a work in progress, but one
              that we'll be making considerable improvements to in the coming
              months.
            </p>
            <p>
              As we launch today, there's two useful features in your Member
              Portal:
            </p>
            <p>
              <b>What you can do now</b>
              <ul>
                <li>Change membership level or cancel (gasp!)</li>
                <li>A few details about which blog posts have been popular recently.</li>
              </ul>
            </p>
            <p>
              <b>Coming soon</b>
              <ul>
                <li>Ad-free member's feed</li>
              </ul>
            </p>
            <p>
              Hey, do you read the fine print?  I'm going to give a free t-shirt to the 
              first member that emails me about this note.  I'll take this down once the
              t-shirt is awarded, so if you're reading this, act now!
            </p>
            <p>
              <b>Want a shout out?</b> - We're considering doing shout outs to members who
              want to hear their name on the podcast and a thank you for the support.  If
              you'd like your name, read, DM me on Slack!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default authPage(
  connect(state => ({
    user: state.auth.getIn(['user']).toJS(),
    loggedIn: state.auth.getIn(['loggedIn']),
    memberportal: state.memberportal
  }))(MembershipPortal),
  {
    title: `Membership Portal`
  }
)
