import initialState from './init'
import uuidV4 from 'uuid/v4'

// Action Types
export const INIT = 'CHATBOT//INIT'
export const DESTROY = 'CHATBOT//DESTROY'
export const MESSAGE_SENT = 'CHATBOT//MESSAGE_SENT'
export const MESSAGE_RECEIVED = 'CHATBOT//MESSAGE_RECEIVED'

// Helpers
const addMessage = (history, message) => [...history, message]

const updateMessage = (history, id, updater) =>
  history.map(message => (message.id === id ? updater(message) : message))

const removeMessage = (history, id) =>
  history.filter(message => message.id !== id)

const nextRandomId = () => uuidV4()

const isImmutable = val => !!val.toJS

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@INIT':
      debugger
      return isImmutable(state) ? state.toJS() : state

    case MESSAGE_SENT:
      return {
        ...state,
        history: addMessage(state.history, action.payload.message)
      }

    case MESSAGE_RECEIVED:
      return {
        ...state,
        history: addMessage(state.history, action.payload.message)
      }

    default:
      return state
  }
}

export default reducer

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
export const sendMessage = message => {
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
export const replyMessage = message => {
  return {
    type: MESSAGE_RECEIVED,
    payload: {
      message
    }
  }
}

// Getters
export const getHistory = state => state.bot && state.bot.history
