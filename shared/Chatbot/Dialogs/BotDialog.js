import { Dialog } from '../../../chatbot_lib/processing'

export default class BotDialog extends Dialog {
  
  response(receivedMessage, context, reply, trigger) {
    reply({
      text: `Whats did you mean by "${receivedMessage.text}"?`
    })
  }
  
}
