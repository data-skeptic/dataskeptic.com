import { Dialog } from '../../../chatbot_lib/processing'

const DIALOG = 'helper'

export default class HelperDialog extends Dialog {
  
  static helpMenu = [
    { label: 'episode recommendations', handler: 1 },
    { label: 'listener survey', handler: 1 },
    { label: 'store', handler: 1 },
    { label: 'profiles', handler: 1 }
  ]
  
  response(receivedMessage, context, reply, trigger) {
    if (receivedMessage.plainText === 'exit') {
      this.exit(receivedMessage, context, reply, trigger)
    }

    reply({
      text: 'How can I help you?'
    })
  }

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return plainText.indexOf('help') > -1
  }


  getId() {
    return DIALOG
  }
}
