import React, { Component } from 'react'
import { connect } from 'react-redux'
import defaultConfig from '../../shared/config'
import defaultProps from '../../shared/props'
import { init, destroy, sendMessage } from '../reducer'
import getState from '../getState'

export default launcherConfig => Launcher => {
  class WrappedLauncher extends Component {
    /**
     * Handle message input
     *
     * @param message.text message input value
     * @param message.type message type [REGULAR | THINKING ]
     * @param message.plainText normalized text input value
     */
    handleMessage = message => {
      this.props.dispatch(sendMessage(message))
    }

    constructor(props) {
      super()

      this.state = this.initState(props)
    }

    /**
     * Build initial state and props from provided props and config
     */
    initState(props) {
      // remove unnecessary props
      const { dispatch, bot, history, operators, ...safeProps } = props

      return {
        props: {
          ...defaultProps,
          ...safeProps,
          history
        },
        config: {
          ...defaultConfig,
          ...launcherConfig
        },
        initialProps: {
          bot,
          history,
          operators
        }
      }
    }

    /**
     * Initialize Chatbot with provided public key
     */
    componentDidMount() {
      const {
        initialProps,
        config: { publicKey }
      } = this.state

      const initConfig = {
        ...initialProps,
        publicKey
      }

      this.props.dispatch(init(initConfig))
    }

    //TODO: handle email changes with component will receive props

    /**
     * Deinitialize current ChatBotNext
     */
    componentWillUnmount() {
      this.props.dispatch(destroy())
    }

    /***
     * Applying next props from redux state to wrapped launcher
     */
    componentWillReceiveProps(nextProps) {
      this.setState({ props: nextProps })
    }

    /**
     * Wrap Launcher props and setup controlled events
     */
    render() {
      const { props, config } = this.state
      return <Launcher {...config} {...props} onMessage={this.handleMessage} />
    }
  }

  return connect(state => getState(state.bot))(WrappedLauncher)
}
