import {fromJS} from 'immutable'

const defaultState = {
  
}

const initialState = fromJS(defaultState) 

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
