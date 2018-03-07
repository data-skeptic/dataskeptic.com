import { Dialog } from "../../../chatbot_lib/processing";

export default class HelperDialog extends Dialog {

  response(receivedMessage, context, reply, trigger) {
    reply({ 
      text: 'How can I help you?'
    })
  }

  canHandle(receivedMessage, session) {
    console.dir('canHandle Helper')
    const { plainText } = receivedMessage
    
    return plainText.indexOf('help') > -1
  }
  
}
