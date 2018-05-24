import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactFormContainer from '../../Contacts/Containers/ContactFormContainer/ContactFormContainer'
import MembershipHeader from './MembershipHeader'
import page from '../../Layout/hoc/page'
import withUser from '../../Layout/hoc/withUser'

class MembershipInbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props
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

export default withUser(
  page(
    connect(state => ({
      memberportal: state.memberportal
    }))(MembershipInbox),
    {
      title: 'Membership Inbox'
    }
  )
)
