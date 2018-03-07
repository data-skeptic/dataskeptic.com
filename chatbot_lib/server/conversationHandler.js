/**
 * Naive method to set next dialog sequence in the chain
 * @param dialogs list of dialogs
 */
const chainify = dialogs => {
  dialogs.forEach((dialog, index, arr) => {
    const hasNext = index < arr.length - 1
    if (hasNext) {
      const nextDialog = arr[index + 1]
      dialog.setNext(nextDialog)
    }
  })
  
  return dialogs
}

const getDialogById = (dialogs, id) => dialogs.filter(dialog => dialog.getId() === id)[0]

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
  
  let handler = null
  if (context.handler) {
    handler = getDialogById(dialogs, context.handler)
    return handler.response(receivedMessage, context, reply, trigger)
  } 
  
  handler = chainify(dialogs)[0]
  handler.handle(receivedMessage, context, reply, trigger)
}
