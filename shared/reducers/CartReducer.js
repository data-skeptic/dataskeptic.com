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
  invalid_submit: false,
  focus: "first_name",
  focus_msg: ""
}

const defaultState = Immutable.fromJS(init);

function do_checkout_submit(nstate) {
  var prod = false
  if (prod) {
    var key = 'pk_live_voDrzfYzsfKP33iuzmhxL4JY'
  } else {
    var key = 'pk_test_y5MWdr7S7Sx6dpRCUTKOWfpf'
  }
  Stripe.setPublishableKey(key)
  nstate.submitDisabled = true
  nstate.paymentError = ""

  var msg = ""
  var valid = true
  var address = nstate.address
  var nstate = validate_address(nstate)
  if (nstate.invalid_submit) {
    return nstate
  }
  
  // TODO: convert this to use promises instead

  Stripe.createToken(event.target, function(status, response) {
    var paymentError = ""
    var paymentComplete = false
    var token = response.id
    var prod = nstate.prod
    var customer = address
    var country = nstate.country_short
    var products = nstate.cart_items
    var total    = nstate.total
    var shipping = nstate.shipping
    if (response.error) {
      paymentError = response.error.message
      console.log("error: " + paymentError)
      // Need to find a way to update redux state with values below
      nstate.paymentError = paymentError
      nstate.focus_msg = ""
      nstate.submitDisabled = false
    } else {
      console.log("response ok")
      nstate.submitDisabled = true
      nstate.token = token
      var dt = (new Date()).toString()
      var order = {customer, products, total, paymentComplete, token, paymentError, prod, country, dt, shipping}
      order = self.adjust_for_dynamodb_bug(order)
      console.log(JSON.stringify(order))
      console.log(token)
      axios
        .post("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/order", order)
        .then(function(resp) {
          console.log(resp)
          var result = resp["data"]
          console.log(result)
          if (result["status"] != "ok") {
            console.log(result["msg"])
            nstate.paymentComplete = false
            nstate.submitDisabled = false
            paymentError = result["msg"]
            console.log("order api error")
          } else {
            console.log("Success")
            nstate.paymentComplete = true
            nstate.submitDisabled = false
            self.props.clearCart()
            console.log("order complete")
          }
        })
        .catch(function(err) {
          console.log("order error")
          console.log(err)
          var msg = "Error placing your order: " + err
          nstate.paymentComplete = false
          nstate.submitDisabled = false
          nstate.paymentError = msg
        })
    }
  });
  return nstate
}

function validate_address(nstate) {
  var address = nstate.address
  if (address.last_name.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please enter your name"
    nstate.focus = "last_name"
  }
  else if (address.street_1.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please provide a street address"
    nstate.focus = "street_1"
  }
  else if (address.city.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please provide a valid city"
    nstate.focus = "city"
  }
  else if (address.state.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please provide a state / province"
    nstate.focus = "state"
  }
  else if (address.zip.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please provide a postal code"
    nstate.focus = "zip"
  }
  else if (address.email.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please provide an email address"
    nstate.focus = "email"
  }
  else if (address.phone.trim() == "") {
    nstate.invalid_submit = true
    nstate.focus_msg = "Please provide a phone number"
    nstate.focus = "phone"
  }
  else {
    nstate.invalid_submit = false
    nstate.focus_msg = ""
    nstate.focus = ""
  }
  return nstate
}

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
      nstate.cart_visible = !nstate.cart_visible
      break;
    case 'SHOW_CART':
      nstate.cart_visible = action.payload
      break;
    case 'UPDATE_ADDRESS':
      var cls = action.payload.cls
      var val = action.payload.val
      nstate.address[cls] = val
      nstate.focus_msg = ""
      break;
    case 'DO_CHECKOUT':
      nstate = validate_address(nstate)
      if (!nstate.invalid_submit) {
        nstate = do_checkout_submit(nstate)        
      } else {
        console.log("invalid")
      }
      break;
    case 'CLEAR_FOCUS':
      nstate.focus = ""
      break;
  }
  nstate.total = calculateTotal(nstate.cart_items, nstate.country_short)
  nstate.shipping = calculateShipping(nstate.cart_items, nstate.country_short)
  return Immutable.fromJS(nstate)
}
