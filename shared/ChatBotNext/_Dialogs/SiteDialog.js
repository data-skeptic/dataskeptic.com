import { Dialog } from '../../../chatbot_lib/processing'

export const DIALOG = 'site'

export default class SiteDialog extends Dialog {

  response(receivedMessage, context, reply, trigger) {
    reply({
      text: '![Our logo alt text](https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg)'
    })
  }

  canHandle(receivedMessage, session) {
    const { plainText } = receivedMessage

    return plainText.indexOf('logo') > -1
  }


  getId() {
    return DIALOG
  }

}
