import React, { Component } from 'react'
import { connect } from 'react-redux'
import SendEmail from './SendEmail'
import page from "../../Layout/hoc/page";

class AdminEmailsSend extends Component {
  render() {
    return (
      <div>
        <h3>Send Email</h3>

        <SendEmail />
      </div>
    )
  }
}
export default page(connect(state => ({}))(AdminEmailsSend), {
  title: `Send Email`
})
