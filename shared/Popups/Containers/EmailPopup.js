import React, { Component } from 'react'
import popup from '../hoc/popup'
import { connect } from 'react-redux'

export const KEY = `email`

class EmailPopup extends Component {
  render() {
    return <div>email</div>
  }
}

export default connect((state, ownProps) => ({}))(
  popup(EmailPopup, {
    key: KEY,
    height: '400px',
    width: '400px'
  })
)
