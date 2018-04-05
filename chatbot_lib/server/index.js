import uuidV4 from 'uuid/v4'

import conversationHandler from './conversationHandler'
import {
  INIT,
  INIT_SUCCESS,
  MESSAGE_RECEIVED,
  MESSAGE_SENT
} from '../shared/actionTypes'
import { initSuccess, receiveMessage } from '../client/reducer'
import Agent from './Agent'

const generateUserId = () => uuidV4()

const handleLogic = (agent, dialogs, reply, greeting) => {
  agent.on(INIT, data => {
    // initialize session
    const userId = generateUserId()
    const sessionData = {
      ...data,
      userId
    }
    agent.saveSession(sessionData)

    // notify agent about success
    agent.triggerAction(initSuccess({ id: userId }))
    // greeting user on connection
    greeting(agent.getSession(), reply)
  })

  agent.on(MESSAGE_SENT, data =>
    conversationHandler({
      dialogs,
      receivedMessage: data.message,
      context: agent.getSession(),
      reply,
      trigger: agent.triggerAction
    })
  )
}

const run = (server, { dialogs = [], greeting = () => {} }) => {
  if (!server) {
    throw Error('Server is specified.')
  }

  const io = require('socket.io')(server)
  console.log(`Waiting for new chat connections`)

  io.on('connection', function(socket) {
    console.log('User connected')

    const agent = Agent(socket)
    
    // handle dialogs logic
    handleLogic(
      agent,
      dialogs,
      (message) => {
        const bot = agent.getSession().get('bot')
        message.author = message.author || bot
        
        agent.triggerAction(receiveMessage(message))
      },
      greeting
    )
  })
}

export default run
