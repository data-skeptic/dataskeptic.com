import Immutable, { fromJS } from 'immutable'

import {
  CHECKOUT_REQUEST_START,
  CHECKOUT_REQUEST_SUCCESS,
  CHECKOUT_REQUEST_FAILED,
  RECEIPT_REQUEST_START,
  RECEIPT_REQUEST_SUCCESS,
  RECEIPT_REQUEST_FAILED
} from '../Actions/CheckoutActions'

const defaultState = {
  error: '',
  success: '',
  processing: false,
  loaded: false,
  receipt: {}
}

const initialState = fromJS(defaultState)

export default function CheckoutReducer(state = initialState, action) {
  let nstate = state.toJS()

  switch (action.type) {
    case CHECKOUT_REQUEST_START:
      nstate.error = ''
      nstate.success = ''
      nstate.processing = true
      break
    case CHECKOUT_REQUEST_SUCCESS:
      nstate.success = 'Checkout completed! Thanks.'
      nstate.processing = false
      nstate.receipt = action.payload.data
      nstate.loaded = true
      break
    case CHECKOUT_REQUEST_FAILED:
      nstate.success = ''
      nstate.error = action.payload.error
      nstate.processing = false
      nstate.loaded = false
      break

    case RECEIPT_REQUEST_START:
      nstate.error = null
      nstate.loaded = false
      nstate.processing = true
      nstate.receipt = {}
      break
    case RECEIPT_REQUEST_SUCCESS:
      nstate.loaded = true
      nstate.processing = false
      nstate.receipt = action.payload.data
      break
    case RECEIPT_REQUEST_FAILED:
      nstate.loaded = false
      nstate.receipt = {}
      nstate.error = action.payload.error
      break

    default:
      break
  }

  return fromJS(nstate)
}
