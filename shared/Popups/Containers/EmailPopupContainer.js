import React, { Component } from 'react'
import { connect } from 'react-redux'
import { open, close } from '../helpers/popup'
import { read, write } from '../../Tracking/storage'
import EmailPopup, { KEY as EMAIL_POPUP_KEY } from './EmailPopup'

const TIME_DELAY = 5 * 1000
const OFFSET_POS = 320

class EmailPopupContainer extends Component {
  state = {
    hasSeen: false,
    scrolledToOffset: false,
    idleTimeFinished: false,
    triggered: false
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

  componentWillUpdate(nextProps, nextState) {
    if (nextState.scrolledToOffset && nextState.idleTimeFinished) {
      this.trigger()
      this.setState({
        scrolledToOffset: false,
        idleTimeFinished: false
      })
    }
  }

  startListener() {
    console.log(`startListener`)

    window.addEventListener('scroll', this.listenScroll)
    this.timer = setTimeout(this.idleTimer, TIME_DELAY)
  }

  stopListener() {
    console.log(`stopListener`)

    clearTimeout(this.timer)
    window.removeEventListener('scroll', this.listenScroll)
  }

  listenScroll = e => {
    if (!this.state.ticking) {
      console.log(`scroll`, window.scrollY)
      if (window.scrollY >= OFFSET_POS) {
        window.requestAnimationFrame(() =>
          this.setState({
            ticking: false,
            scrolledToOffset: true
          })
        )
      }

      this.setState({
        ticking: false
      })
    }
  }

  idleTimer = () => {
    console.info(`idleTimer`)
    this.setState({
      idleTimeFinished: true
    })
  }

  trigger = () => {
    this.stopListener()
    this.setState({
      triggered: true
    })
    
    this.props.dispatch(open(EMAIL_POPUP_KEY))
  }

  markSeen = () => write(EMAIL_POPUP_KEY, true)

  render() {
    return <EmailPopup onClose={this.markSeen} />
  }
}

export default connect(state => ({}))(EmailPopupContainer)
