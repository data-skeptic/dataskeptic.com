export default (dialogs, receivedMessage, reply, trigger) => {
  const message = {
    text: `You said "${receivedMessage.message.text}".`
  }

  return reply(message)
}
