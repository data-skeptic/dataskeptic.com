import { Dialog } from '../../../chatbot_lib/processing'

export default class KyleDialog extends Dialog {
  response(receivedMessage, context, reply, trigger) {
    reply({
      text: `I'll need to give it some thought and get back to you.`,
      author: 'kyle'
    })
  }

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return plainText.indexOf('what would kyle say') > -1
  }
}
