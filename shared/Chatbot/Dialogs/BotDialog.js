import { Dialog } from '../../../chatbot_lib/processing'

export default class BotDialog extends Dialog {

  response(receivedMessage, context, reply, trigger) {
    console.dir(receivedMessage)
    reply({
      text: receivedMessage.plainText
    })
  }
  
  getId() {
    return `bot`
  }
  
}
