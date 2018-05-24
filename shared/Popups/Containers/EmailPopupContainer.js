import React, { Component } from 'react'
import { connect } from 'react-redux'
import { open, close } from '../helpers/popup'
import { read, write } from '../../Tracking/storage'
import EmailPopup, { KEY as EMAIL_POPUP_KEY } from './EmailPopup'

const TIME_DELAY = 10 * 1000

class EmailPopupContainer extends Component {
  state = {
    hasSeen: false
  }

  componentDidMount() {
    const hasSeen = read(EMAIL_POPUP_KEY)

    if (!hasSeen) {
      this.startListener()
    }
  }

  componentWillUnmount() {
    this.stopListener()
    this.props.dispatch(close(EMAIL_POPUP_KEY))
  }

  startListener() {
    console.log(`startListener`)
    this.timer = setTimeout(this.trigger, TIME_DELAY)
  }

  stopListener() {
    console.log(`stopListener`)
    clearTimeout(this.timer)
  }

  trigger = () => {
    alert(`show`)
  }

  markSeen = () => {
    debugger
    this.write(EMAIL_POPUP_KEY, true)
  }

  render() {
    return <EmailPopup onClose={this.markSeen}/>
  }
}

export default connect(state => ({}))(EmailPopupContainer)
