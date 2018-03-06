export default (receivedMessage, reply) => {
  console.dir(receivedMessage)
  
  const message = {
    text: 'Hi there!'
  }
  
  return reply(message)
  
}
