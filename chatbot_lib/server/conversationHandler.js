/**
 * Naive method to set next dialog sequence in the chain
 * @param dialogs list of dialogs
 */
const chainify = dialogs => {
  dialogs.forEach((dialog, index, arr) => {
    console.log('chain')
    if (index < arr.length - 1) {
      console.log('set next!')
      const nextDialog = arr[index + 1]
      dialog.setNext(nextDialog)
    }
  })
  
  return dialogs
}
  

/**
 * Process user input .
 * In fact apply dialogs and implements machine state logic for each dialog
 *
 * @param dialogs array of registered dialogs
 * @param receivedMessage user input meta data
 * @param receivedMessage.text user input
 * @param receivedMessage.plainText normalized message
 * @param context agent session state
 * @param reply bot message reply callback
 * @param trigger redux store action trigger
 */
export default ({ dialogs, receivedMessage, context, reply, trigger }) => {
  if (dialogs.length === 0) return
  
  const start = chainify(dialogs)[0]
  start.handle(receivedMessage, context, reply, trigger)
}
