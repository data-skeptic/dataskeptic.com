const initPopup = (key, store = {}) => ({
  ...store,
  key,
  open: false
})

export default (state, {key}) => ({
  ...state,
  [key]: initPopup(key)
})

export const INIT = 'POPUPS//INIT'
export const DEINIT = 'POPUPS//DEINIT'
export const OPEN = 'POPUPS//OPEN'
export const CLOSE = 'POPUPS//CLOSE'
export const TOGGLE = 'POPUPS//TOGGLE'

export const init = (key) => ({
  type: INIT,
  payload: {key}
})

export const deinit = (key) => ({
  type: DEINIT,
  payload: {key}
})

export const open = (key, safe = true) => ({
  type: OPEN,
  payload: {
    key,
    safe
  }
})

export const close = (key) => ({
  type: CLOSE,
  payload: {
    key
  }
})

export const toggle = (key) => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE,
      payload: { key }
    })
    
    if (isOpen(getState().popups, key)) {
      dispatch(close(key))
    } else {
      dispatch(open(key))
    }
  }
}

export const isOpen = (state, key) => state.getIn([key, 'open'])
