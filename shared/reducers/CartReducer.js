import Immutable from 'immutable';
import { fromJS } from 'immutable';

import { calculateShipping, calculateTotal } from "../components/store_utils"

const init = {
  cart_items: [],
  total: 0,
  shipping: 0,
  cart_visible: false,
  go_to_checkout: false,
  country_short: "us",
  country_long: "United States of America",
  stripeLoading: false,
  stripeLoadingError: false,
  submitDisabled: false,
  paymentError: "",
  paymentComplete: false,
  token: null,
  sizeSelected: {},
  address: {
    first_name: "",
    last_name: "",
    street_1: "",
    street_2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: ""
  },
  focus: "",
  focus_msg: ""
}

const defaultState = Immutable.fromJS(init);

export default function cartReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
  	case 'ADD_TO_CART':
      var found_index = -1
      var cart_item = action.payload
      for (var i=0; i < nstate.cart_items.length; i++) {
        var citem = nstate.cart_items[i]
        if (citem.product.id == cart_item.product.id && citem.size == cart_item.size) {
          found_index = i
          i = nstate.cart_items.length
        }
      }
      if (found_index == -1) {
        cart_item.quantity = 1
        nstate.cart_items.push(cart_item)
      } else {
        nstate.cart_items[found_index].quantity += 1
      }
      break;
    case 'CHANGE_CART_QUANTITY':
      var delta = action.payload.delta
      var product = action.payload.product
      var size = action.payload.size
      var found_index = -1
      for (var i=0; i < nstate.cart_items.length; i++) {
        var citem = nstate.cart_items[i]
        if (citem.product.id == product.id && citem.size == size) {
          found_index = i
          i = nstate.cart_items.length
        }
      }
      if (found_index == -1) {
        cart_item.quantity = 1
        nstate.cart_items.push(cart_item)
      } else {
        nstate.cart_items[found_index].quantity += delta
        if (nstate.cart_items[found_index].quantity == 0) {
          nstate.cart_items.splice(found_index,1)
        }
      }
      break;
    case 'CHANGE_COUNTRY':
      nstate.country_short = action.payload.short
      nstate.country_long = action.payload.long
      break;
    case 'TOGGLE_CART':
      console.log("tcccccc")
      nstate.cart_visible = !nstate.cart_visible
      break;
    case 'SHOW_CART':
      nstate.cart_visible = action.payload
      break;
    case 'UPDATE_ADDRESS':
      nstate.address = action.payload
      break;
  }
  nstate.total = calculateTotal(nstate.cart_items, nstate.country_short)
  nstate.shipping = calculateShipping(nstate.cart_items, nstate.country_short)
  return Immutable.fromJS(nstate)
}
