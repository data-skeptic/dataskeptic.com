import { Dialog } from "../../../chatbot_lib/processing";

export default class ExitDialog extends Dialog {

  response(receivedMessage, context, reply, trigger) {
    context.clearHandler()
    
    reply({ 
      text: "Ok, let's talk about something new."
    })
  }

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage
    
    return plainText === "exit"
  }
  
}
