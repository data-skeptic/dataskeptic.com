import io from 'socket.io-client'
import {
  ON_MESSAGE_SENT,
  ON_MESSAGE_REPLY
} from '../shared/events'

const isDev = process.env.NODE_ENV === 'dev'
const log = ({...args}) => isDev && console.log('[CHATBOT]', ...args)

/**
 * List of events which should be rethrown to redux 
 */
const handledEvents = [
  ON_MESSAGE_SENT,
  ON_MESSAGE_REPLY
]

/**
 * Connector handle and process socket connection with chatbot server
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
   * Initialize connection with chatbot server
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
    handledEvents.forEach(e => this.socket.on(e, this.handleAction))
  }

  /**
   * Proxy method to emit action on the chatbot server
   */
  emit(action, data) {
    this.socket.emit(action, data)
  }
  
  /**
   * Close connection with chatbot server
   */
  deinit() {
    log('Connector deinit')

    if (this.socket) {
      this.socket.disconnect(true)
      this.socket = null
    }
  }
}
