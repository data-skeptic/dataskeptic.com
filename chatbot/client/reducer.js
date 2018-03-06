import initialState from './init'

// Action Types
export const INIT = 'CHATBOT//INIT'
export const INIT_SUCCESS = 'CHATBOT//INIT_SUCCESS'
export const DESTROY = 'CHATBOT//DESTROY'
export const MESSAGE_SENT = 'CHATBOT//MESSAGE_SENT'
export const MESSAGE_RECEIVED = 'CHATBOT//MESSAGE_RECEIVED'

// Helpers
const addMessage = (history, message) => [...history, message]

const updateMessage = (history, id, updater) =>
  history.map(message => (message.id === id ? updater(message) : message))

const removeMessage = (history, id) =>
  history.filter(message => message.id !== id)

const isImmutable = val => !!val.toJS

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@INIT':
      return isImmutable(state) ? state.toJS() : state

    case INIT:
      return {
        ...state,
        ready: true,
        email: action.payload.email,
        publicKey: action.payload.publicKey,
        bot: action.payload.bot,
        history: [...action.payload.history],
        operators: { ...action.payload.operators }
      }

    case INIT_SUCCESS:
      return {
        ...state,
        connected: true,
        id: action.payload.id
      }

    case MESSAGE_SENT:
      return {
        ...state,
        history: addMessage(state.history, action.payload.message)
      }

    case MESSAGE_RECEIVED:
      return {
        ...state,
        history: addMessage(state.history, {
          ...action.payload.message,
          author: getOperator(state, action.payload.message.author)
        })
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
export const init = config => {
  return {
    type: INIT,
    payload: config
  }
}

/**
 * Trigger success connection setup callback
 */
export const initSuccess = data => {
  return {
    type: INIT_SUCCESS,
    payload: data
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
export const receiveMessage = message => {
  return {
    type: MESSAGE_RECEIVED,
    payload: {
      message
    }
  }
}

// Getters
export const getHistory = state => state.history

export const getOperators = state => state.operators

export const getOperator = (state, operator) =>
  state.operators && state.operators[operator]
