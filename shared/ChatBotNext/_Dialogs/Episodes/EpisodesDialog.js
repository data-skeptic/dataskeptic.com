import { Dialog } from '../../../../chatbot_lib/processing/index'

export const DIALOG = 'episodes'

export default class EpisodesDialog extends Dialog {
  getOpeningRemark(receivedMessage, context) {
    return `What sort of topics are you interested in?`
  }
  
  response(receivedMessage, context, reply, trigger) {
    
  }

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return plainText.indexOf('help') > -1
  }


  getId() {
    return DIALOG
  }

}
