export default (receivedMessage, reply) => {
  const message = {
    text: `You said "${receivedMessage.message.text}".`
  }
  
  return reply(message)
}
