import { StateDialog } from '../../../chatbot_lib/processing'
import chatter from "./chatter";

export const DIALOG = 'survey'

export default class SurveyDialog extends StateDialog {
  
  getOpeningRemark(receivedMessage, context) {
    return {
      text: chatter.get_message("SURVEY>WELCOME")
    }
  }

  isOpener(text) {
    return text === 'survey'
  }

  afterOpen(receivedMessage, context, reply, trigger) {
    
  }

  getId() {
    return DIALOG
  }
}
