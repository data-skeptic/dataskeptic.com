import chatter from './chatter'

import { StateDialog } from '../../../chatbot_lib/processing'
import { MENU_ITEMS_MESSAGE } from '../../../chatbot_lib/shared/messageTypes'

const triggerWords = ['help']

const DIALOG = 'helper'

export default class HelperDialog extends StateDialog {
  static helpMenu = [
    { label: 'episode recommendations', handler: 1 },
    { label: 'listener survey', handler: 2 },
    { label: 'store', handler: 3 },
    { label: 'profiles', handler: 4 }
  ]

  getOpeningRemark(receivedMessage, context) {
    return {
      text: chatter.get_message('HELP>TRY_CHOICES'),
      list: HelperDialog.helpMenu,
      type: MENU_ITEMS_MESSAGE
    }
  }

  getCloseMessage() {
    return { text: chatter.get_message('HELP>BYE') } 
  }
  
  commandResponse(receivedMessage, context, reply, trigger) {
    // for (var item of module.exports.help_menu) {
    //   var label = item['label']
    //   var similarity = stringSimilarity.compareTwoStrings(imsg, label)
    //   if (similarity > .5) {
    //     msg = item.get_opening_remark()
    //     handler = item['handler']
    //     return {msg, handler}
    //   }
    // }
    reply({
      text: `I didn't understand you.  Please try again or say <mark type="exit">'exit'</mark> to give up on help.`
    })
  }

  isOpener(text) {
    return triggerWords.filter(word => text.indexOf(word) > -1).length > 0
  }

  getId() {
    return DIALOG
  }
}
