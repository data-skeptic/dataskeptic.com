import React, { Component } from 'react'
import { connect } from 'react-redux'
import defaultConfig from '../../shared/config'
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
     * Build initial state and props from pushed props and config
     */
    initState(props) {
      const { initialProps, ...initialConfig } = launcherConfig
      
      // remove unnecessary props 
      const {
        dispatch,
        ...safeProps
      } = props
      
      return {
        props: {
          ...initialProps,
          ...safeProps
        },
        config: {
          ...defaultConfig,
          ...initialConfig
        }
      }
    }

    /**
     * Initialize Chatbot with provided public key
     */
    componentDidMount() {
      const { publicKey } = launcherConfig
      this.props.dispatch(init(publicKey))
    }

    /**
     * Deinitialize current chatbot
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

      console.dir('update launcher')
      return (
        <Launcher
          {...config}
          {...props}
          onMessage={this.handleMessage}
        />
      )
    }
  }

  return connect(state => getState(state))(WrappedLauncher)
}
