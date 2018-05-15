import {fromJS} from 'immutable'

const defaultState = {
  
}

initialState = fromJS(defaultState) 

export default (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}
