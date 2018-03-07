import Dialog from './Dialog'

/***
 **
 **/
export default class StateDialog extends Dialog {
  /**
   *
   *
   * @param receivedMessage user input meta data
   * @param receivedMessage.text user input
   * @param receivedMessage.plainText normalized message
   * @param context agent session state
   */
  getOpeningRemark(receivedMessage, context) {}

  isOpener(text) {
    return false
  }

  isCloser(text) {
    return text === 'exit'
  }

  beforeExit(receivedMessage, content, reply, trigger) {}

  exit(receivedMessage, context, reply, trigger) {
    context.resetHandler()
    const closeMessage = this.getCloseMessage()
    if (!closeMessage) return

    return reply(closeMessage)
  }

  afterExit(receivedMessage, content, reply, trigger) {}

  beforeOpen(receivedMessage, content, reply, trigger) {}

  open(receivedMessage, context, reply, trigger) {
    context.setHanlder(this.getId())

    return reply(this.getOpeningRemark(receivedMessage, context))
  }

  afterOpen(receivedMessage, content, reply, trigger) {}

  getCloseMessage(context) {}

  response(receivedMessage, context, reply, trigger) {
    const { plainText } = receivedMessage

    // handle opening state
    if (this.isOpener(plainText)) {
      this.beforeOpen(receivedMessage, context, reply, trigger)
      this.open(receivedMessage, context, reply, trigger)
      this.afterOpen(receivedMessage, context, reply, trigger)
      // stop flow
      return
    }

    // handle exiting state
    if (this.isCloser(plainText)) {
      this.beforeExit(receivedMessage, context, reply, trigger)
      this.exit(receivedMessage, context, reply, trigger)
      this.afterExit(receivedMessage, context, reply, trigger)

      // stop flow
      return
    }

    this.commandResponse(receivedMessage, context, reply, trigger)
  }

  commandResponse() {}

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return this.isOpener(plainText)
  }


}
