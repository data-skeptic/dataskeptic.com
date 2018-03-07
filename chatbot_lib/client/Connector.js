import io from 'socket.io-client'
import actions from '../shared/actionTypes'

const isDev = process.env.NODE_ENV === 'dev'
const log = ({...args}) => isDev && console.log('[CHATBOT]', ...args)

/**
 * Connector handle and process socket connection with ChatBotNext server
 */
export default class Connector {
  /**
   * Dispatch received action to the redux
   */
  handleAction = (action) => {
    this.dispatch(action)
  }

  constructor(dispatch) {
    this.dispatch = dispatch
    this.socket = null
  }

  /**
   * Initialize connection with ChatBotNext server
   *
   * @param userId unique user session identificator
   */
  init({ userId }) {
    log('Connector init')

    this.socket = io()
    this.initEvents()
  }

  /**
   * Attach handlers for socket events
   */
  initEvents() {
    actions.forEach(e => this.socket.on(e, this.handleAction))
  }

  /**
   * Proxy method to emit action on the ChatBotNext server
   */
  emit(action, data) {
    this.socket.emit(action, data)
  }
  
  /**
   * Close connection with ChatBotNext server
   */
  deinit() {
    log('Connector deinit')

    if (this.socket) {
      this.socket.disconnect(true)
      this.socket = null
    }
  }
}
