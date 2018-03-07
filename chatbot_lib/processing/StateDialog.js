import Dialog from "./Dialog"

/***
 **
 **/
export default class StateDialog extends Dialog {

  getOpeningRemark(receivedMessage, context) {
    return null
  }

  isOpener(text) {
    return false
  }

  exit(context, reply, trigger) {
    context.resetHandler()
    const closer = this.getCloser()
    if (!closer) return;

    return reply({
      text: this.getCloser()
    })
  }

  getCloser(context) {
    return null
  }

  response(receivedMessage, context, reply, trigger) {
    const { plainText } = receivedMessage

    // handle exit?
    if (plainText === 'exit') {
      return this.exit(context, reply, trigger)
    }

    //
    if (this.isOpener(plainText)) {
      context.setHanlder(this.getId())

      return reply({
        text: this.getOpeningRemark(receivedMessage, context)
      })
    }

    this.commandResponse(receivedMessage, context, reply, trigger)
  }

  commandResponse() {

  }

}
