import Immutable from 'immutable'

const init = {
  products: [],
  products_loaded: 0
}

const defaultState = Immutable.fromJS(init)

export default function productsReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch (action.type) {
    case 'ADD_PRODUCTS':
      nstate.products = action.payload
      nstate.products_loaded = 1
      break
    case 'FETCH_PRODUCTS_ERROR':
      nstate.products_loaded = -1
      break
  }
  return Immutable.fromJS(nstate)
}
