import initialState from './init'
import uuidV4 from 'uuid/v4'

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

const nextRandomId = () => uuidV4()

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return state

    default:
      return state
  }
}

/**
 * Shared data
 */

// Actions

/**
 * Initialize chatbot instance
 */
export const init = email => {
  const userId = email ? email : nextRandomId()

  return {
    type: INIT,
    payload: {
      userId
    }
  }
}

/**
 * Deconstructing chatbot instance
 */
export const destroy = () => {
  return {
    type: DESTROY
  }
}

/**
 * Send message event to the chatbot server
 */
export const sendMessage = (message) => {
  return {
    type: MESSAGE_SENT,
    payload: {
      message
    }
  }
}

/**
 * Send message event to the chatbot server
 */
export const replyMessage = (message) => {
  return {
    type: MESSAGE_RECEIVED,
    payload: {
      message
    }
  }
}
