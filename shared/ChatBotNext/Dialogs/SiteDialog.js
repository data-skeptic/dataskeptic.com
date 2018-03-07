import { Dialog } from "../../../chatbot_lib/processing";

export default class SiteDialog extends Dialog {

  response(receivedMessage, context, reply, trigger) {
    let text = ''
    
    text = 'Please implement support for markdown so that bot can triggerAction with images ![Our logo alt text](https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg)'
    
    reply({
      text
    })
  }

  canHandle(receivedMessage, session) {
    console.dir('canHandle SiteDialog')
    const { plainText } = receivedMessage
    
    return plainText.indexOf('logo') > -1
  }
  
}
