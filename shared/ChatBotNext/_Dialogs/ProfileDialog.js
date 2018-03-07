import { StateDialog } from '../../../chatbot_lib/processing'

const triggerWords = ['cast', 'host', 'profile']

export const DIALOG = 'profile'

export default class ProfileDialog extends StateDialog {
  static formatProfile({ prettyname, bio, img }) {
    return `**${prettyname}** - ${bio} <br/><br/> ![prettyname](${img})`
  }
  
  getOpeningRemark(receivedMessage, context) {
    return `Whose profile would you like to see?`
  }

  getCloser() {
    return `All right`
  }
  
  commandResponse(receivedMessage, context, reply, trigger) {
    const { plainText } = receivedMessage
    const profileKey = plainText
    const contributors = context.get('contributors')

    const contributor = contributors && contributors[profileKey]
    if (contributor) {
      reply({
        text: ProfileDialog.formatProfile(contributor)
      })
    } else {
      reply({
        text:
          "I'm sorry, I'm not sure who you mean.  My string matching is very poorly implemented in this regard.  You'd think Kyle would have done a better job programming me.  That guy, geez.  Can you simplify?  Let's try first name only, lower case as if this was implemented in the worst possible way.  To give up, type 'exit'"
      })
    }
  }

  isOpener(text) {
    return triggerWords.filter(word => text.indexOf(word) > -1).length > 0
  }
  
  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return this.isOpener(plainText)
  }

  getId() {
    return DIALOG
  }
}
