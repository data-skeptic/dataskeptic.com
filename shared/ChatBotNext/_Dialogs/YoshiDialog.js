import { StateDialog } from '../../../chatbot_lib/processing'
import chatter from "../Dialogs/chatter";

export const DIALOG = 'yoshi'

export default class YoshiDialog extends StateDialog {

  getOpeningRemark(receivedMessage, context) {
    return {
      text: `Yoshi is available for chat.  Please type <mark type="exit">'exit'</mark> to get back to me.  Say 'hi' to get going.`,
      author: 'yoshi'
    }
  }

  getCloseMessage(context) {
    return {
      text: `So it goes ✨`,
      author: 'yoshi'
    }
  }
  
  commandResponse(receivedMessage, context, reply, trigger) {
    if (receivedMessage.plainText === 'hi') {
      reply({
        text: chatter.get_message("YOSHI>GREETING"),
        author: 'yoshi'
      })  
    } else {
      reply({
        text: `Try again`,
        author: 'yoshi'
      })
    }
    
  }

  isOpener(text) {
    return text.indexOf('yoshi') > -1
  }

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return this.isOpener(plainText)
  }

  getId() {
    return DIALOG
  }
}
