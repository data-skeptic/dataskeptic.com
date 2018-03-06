import initialState from './init'
import uuidV4 from 'uuid/v4'
import io from 'socket.io-client'

// Action Types
export const INIT = 'CHATBOT//INIT'
export const DESTROY = 'CHATBOT//DESTROY'
export const MESSAGE_SENT = 'CHATBOT//MESSAGE_SENT'
export const MESSAGE_RECEIVED = 'CHATBOT//MESSAGE_RECEIVED'

// Helpers
const addMessage = (messages, message) => [...messages, message]

const updateMessage = (messages, id, updater) =>
  messages.map(message => (message.id === id ? updater(message) : message))

const removeMessage = (messages, id) =>
  messages.filter(message => message.id !== id)

const nexRandomId = () => uuidV4()

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return state

    case MESSAGE_RECEIVED:
      return state

    default:
      return state
  }
}

/**
 * Shared data
 */
let socket = null

/**
 * Initialize connection with chatbot server
 * 
 * @param userId unique user session identificator 
 */
function initServerConnection({ userId }) {
  socket = io()

  socket.on('connect', function() {})
  socket.on('event', function(data) {})
  socket.on('disconnect', function() {})

  socket.on('messages:received', function() {
    console.log('reply')
  })
}

/**
 * Close connection with chatbot server
 */
function destroyServerConnection() {
  if (socket) {
    socket.disconnect(true)
    socket = null
  }
}

// Actions

/**
 * Initialize chatbot instance
 * @returns {{type: string}}
 */
export const init = () => {
  const userId = nexRandomId()

  initServerConnection({
    userId
  })

  return {
    type: INIT
  }
}

/**
 * Deconstructing chatbot instance  
 */
export const destroy = () => {
  destroyServerConnection()

  return {
    type: DESTROY
  }
}

/**
 * Send message event to the chatbot server 
 */
export const sendMessage = () => {
  return {
    type: MESSAGE_SENT
  }
}
