/**
 * Dialog handler
 */
export default class Dialog {

  /**
   * Handle provided user input
   *
   * @param receivedMessage user input meta data
   * @param receivedMessage.text user input
   * @param receivedMessage.plainText normalized message
   * @param context agent session state
   * @param reply bot message reply callback
   * @param trigger redux store action trigger
   */
  handle = (receivedMessage, context, reply, trigger) => {
    // look for handler candidate
    if (this.canHandle(receivedMessage, context)) {
      return this.response(receivedMessage, context, reply, trigger)
    } else {
      return (
        this.next && this.next.handle(receivedMessage, context, reply, trigger)
      )
    }
  }

  /**
   * Set next Dialog in chain
   * @param next Dialog
   */
  setNext(next) {
    this.next = next
    return next
  }

  /**
   * Respond to provided user input
   *
   * @param receivedMessage user input meta data
   * @param receivedMessage.text user input
   * @param receivedMessage.plainText normalized message
   * @param context agent session state
   * @param reply bot message reply callback
   * @param trigger redux store action trigger
   */
  response(receivedMessage, context, reply, trigger) {
    // empty
  }

  /**
   * Check
   * @param receivedMessage
   * @param context
   */
  canHandle(receivedMessage, context) {
    return true
  }
}
