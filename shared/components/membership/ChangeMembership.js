import React, { Component } from 'react'
import { connect } from 'react-redux'
import MembershipHeader from './MembershipHeader'
import axios from 'axios'
import page from '../../Layout/hoc/page'
import withUser from '../../Layout/hoc/withUser'

class ChangeMembership extends Component {
  componentDidMount() {
    var dispatch = this.props.dispatch
    const { user } = this.props
    var email = user.email
    dispatch({ type: 'LOAD_MEMBER', payload: { dispatch, email } })
  }

  cancelMembership() {
    var dispatch = this.props.dispatch
    var msg = 'Processing cancellation...'
    dispatch({ type: 'UPDATE_MEMBERSHIP_MSG', payload: { msg } })
    var user = this.props.user
    var name = user.email
    var email = 'kyle@dataskeptic.com'
    var message = 'Cancel membership for ' + user.email
    const MAIL_SERVICE_URL = '/api/v1/mail'
    const error = ''
    const data = { name, email, msg: message, error, type: 'contact' }
    axios.post(MAIL_SERVICE_URL, data).then(function(result) {
      var data = result.data
      var status = data.status
      if (status && status == 200) {
        msg =
          'Your membership has been cancelled.  Please allow 2-3 days for processing.'
      } else {
        console.log(data)
        msg =
          'Oh, no!  Something has gone wrong!!! Contact orders@dataskeptic.com with your specific request and we can help.  Sorry!'
      }
      dispatch({ type: 'UPDATE_MEMBERSHIP_MSG', payload: { msg } })
    })
  }

  changeMembership() {
    var dispatch = this.props.dispatch
    const { user } = this.props
    var email = user.email
    dispatch({ type: 'CHANGE_MEMBERSHIP', payload: { dispatch, email } })
    var msg =
      "Oh no!  Sorry, we didn't implement that yet!  You have two options 1) Cancel your current membership and re-subscribe 2) Contact orders@dataskeptic.com with your specific request and we can help."
    dispatch({ type: 'UPDATE_MEMBERSHIP_MSG', payload: { msg } })
  }

  updateMembership() {
    var dispatch = this.props.dispatch
    var user = this.props.user
    dispatch({
      type: 'SAVE_MEMBERSHIP_ADDRESS',
      payload: { dispatch, user }
    })
  }

  onChange(e) {
    var t = e.target
    var field = t.id
    var val = t.value
    this.props.dispatch({
      type: 'UPDATE_MEMBERSHIP_ADDRESS',
      payload: { field, val }
    })
  }

  render() {
    const { user } = this.props
    var omemberportal = this.props.memberportal.toJS()
    var address_msg = omemberportal.address_msg
    var details = omemberportal.details
    var msg = omemberportal.update_member_msg
    var email = user.email
    var member_since = details.member_since
    var address_line_1 = details.address_line_1
    var address_line_2 = details.address_line_2
    var city = details.city
    var state = details.state
    var postal_code = details.postal_code
    var country = details.country
    return (
      <div className="member-portal-container">
        <MembershipHeader user={user} />

        <div className="members-update-account-details-container">
          <h3>Update Account Details</h3>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">Email:</div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">{email}</div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">
              Member since:
            </div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">{member_since}</div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">
              Address Line 1:
            </div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">
                <input
                  className="member-frm-input"
                  id="address_line_1"
                  onChange={this.onChange.bind(this)}
                  value={address_line_1}
                />
              </div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">
              Address Line 2:
            </div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">
                <input
                  className="member-frm-input"
                  id="address_line_2"
                  onChange={this.onChange.bind(this)}
                  value={address_line_2}
                />
              </div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">City:</div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">
                <input
                  className="member-frm-input"
                  id="city"
                  onChange={this.onChange.bind(this)}
                  value={city}
                />
              </div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">State:</div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">
                <input
                  className="member-frm-input"
                  id="state"
                  onChange={this.onChange.bind(this)}
                  value={state}
                />
              </div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">
              Postal code:
            </div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">
                <input
                  className="member-frm-input"
                  id="postal_code"
                  onChange={this.onChange.bind(this)}
                  value={postal_code}
                />
              </div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2 member-frm-label">Country:</div>
            <div className="col-xs-12 col-sm-10">
              <div className="member-frm-ninput">
                <input
                  className="member-frm-input"
                  id="country"
                  onChange={this.onChange.bind(this)}
                  value={country}
                />
              </div>
            </div>
          </div>
          <div className="row member-frm-inner">
            <div className="col-xs-12 col-sm-2" />
            <div className="col-xs-12 col-sm-10">
              <button
                onClick={this.updateMembership.bind(this)}
                className="member-frm-btn"
              >
                Save
              </button>
              &nbsp;&nbsp;&nbsp;{address_msg}
            </div>
          </div>
          <hr />
          <p>{msg}</p>
          <button
            className="member-frm-btn"
            onClick={this.changeMembership.bind(this)}
          >
            Change Membership
          </button>
          <br />
          <br />
          <button
            className="member-frm-btn"
            onClick={this.cancelMembership.bind(this)}
          >
            Cancel Membership
          </button>
        </div>
      </div>
    )
  }
}

export default withUser(
  page(
    connect(state => ({
      memberportal: state.memberportal
    }))(ChangeMembership),
    {
      title: `Change Membership`
    }
  )
)
