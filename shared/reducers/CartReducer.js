import Immutable from 'immutable';
import { fromJS } from 'immutable';
import axios from 'axios';

import { calculateShipping, calculateTotal } from "../utils/store_utils"

const init = {
  cart_items: [],
  total: 0,
  shipping: 0,
  cart_visible: false,
  prod: true, // client/index.jsx will dispatch SET_STORE_ENVIRONMENT on init
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

function get_token(nstate, event, dispatch) {
  console.log(['nstate.prod', nstate.prod])
  if (nstate.prod) {
    var key = 'pk_live_JcvvQ05E9jgvtPjONUQdCqYg'
  } else {
    var key = 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo'
  }
  Stripe.setPublishableKey(key)
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
    var token = response.id
    var paymentError = ""
    if (response.error) {
      paymentError = response.error.message
      console.log("Error: " + paymentError)
      nstate.paymentError = "We were unable to verify your information.  Please check the information below or contact kyle@dataskeptic.com for support."
      nstate.submitDisabled = false
      var msg = {err: paymentError, address: nstate.address}
      var email = nstate.address.email
      dispatch({type: "CONTACT_FORM", payload: {msg, email} })
    }
   dispatch({type: "TOKEN_RECIEVED", payload: { dispatch, token, paymentError } })
  })
  return nstate
}

function adjust_for_dynamodb_bug(obj) {
  // Bug described in: https://forums.aws.amazon.com/thread.jspa?threadID=90137
  var obj2 = JSON.parse(JSON.stringify(obj))
  if (typeof(obj2)=="object") {
    var keys = Object.keys(obj2)
    for (var i=0; i < keys.length; i++) {
      var key = keys[i]
      var val = obj2[key]
      if (typeof(val)=="string") {
        if (val=="") {
          obj2[key] = " "
        }
      }
      else if (typeof(val)=="object") {
        obj2[key] = adjust_for_dynamodb_bug(val)
      }
    }
    return obj2
  } else {
    return obj2
  }
}

function token_recieved(dispatch, nstate) {
  var customer = nstate.address
  var products = nstate.cart_items
  var total    = nstate.total
  var paymentComplete = false
  var token = nstate.token
  var paymentError = nstate.paymentError
  var prod = nstate.prod
  console.log(["ns", nstate])
  var country = nstate.country_short
  if (country == undefined) {
    console.log("Setting country to US")
    country = "us"
  }
  var dt = (new Date()).toString()
  var shipping = nstate.shipping
  var order = {customer, products, total, paymentComplete, token, paymentError, prod, country, dt, shipping}
  order = adjust_for_dynamodb_bug(order)
  console.log(token)
  order['country'] = country
  console.log(country)
  console.log(JSON.stringify(order))
  axios
    .post("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/order", order)
    .then(function(resp) {
      console.log(resp)
      var result = resp["data"]
      var paymentComplete = false
      var paymentError = ""
      if (result["msg"] != "ok") {
        console.log(["E: ", result])
        paymentComplete = false
        paymentError = result["msg"] || result["errorMessage"] || ""
        var address = nstate.address
        var msg = {paymentError, address}
        var email = nstate.address.email
        dispatch({type: "CONTACT_FORM", payload: {msg, email} })
      } else {
        paymentComplete = true
      }
      setTimeout(
        function() {
          dispatch({type: "PROCESS_CHECKOUT", payload: { dispatch, paymentComplete, paymentError } })
        }
      , 10)
    })
    .catch(function(err) {
      console.log("order error:")
      console.log(err)
      var msg = "Error placing your order: " + err
      paymentComplete = false
      paymentError = msg
      var p = { dispatch, paymentComplete, paymentError }
      setTimeout(
        function() {
          dispatch({type: "PROCESS_CHECKOUT", payload: p })
        }
      , 10)
    })
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

function clearCart(nstate) {
  nstate.total = 0
  nstate.shipping = 0
  nstate.cart_items = []
  return nstate
}

export default function cartReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
  	case 'ADD_TO_CART':
      nstate.paymentComplete = false
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
    case 'SET_STORE_ENVIRONMENT':
      var env = action.payload
      if (env == "prod") {
        nstate.prod = true
      } else {
        nstate.prod = false        
      }
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
      var dispatch = action.payload.dispatch
      var event = action.payload.event
      nstate = validate_address(nstate)
      if (!nstate.invalid_submit) {
        nstate.submitDisabled = true
        nstate = get_token(nstate, event, dispatch)
      } else {
        console.log("invalid")
      }
      break;
    case 'TOKEN_RECIEVED':
      var dispatch = action.payload.dispatch
      var token = action.payload.token
      var paymentError = action.payload.paymentError
      console.log("token:" + token)
      nstate.token = token
      nstate.paymentError = paymentError
      if (nstate.paymentError != "") {
        nstate.paymentError = "Please make sure you entered your credit card information correctly and try again.  If you continue to have problems, please contact kyle@dataskeptic.com for support.  We apologize for any inconvenience."
        nstate.submitDisabled = false
        var msg = {paymentError: nstate.paymentError, address: nstate.address}
        var email = nstate.address.email
        setTimeout(
          function() {
            dispatch({type: "CONTACT_FORM", payload: {msg, email} })
          }
        , 10)
      }
      if (token != undefined) {
        token_recieved(dispatch, nstate)
      } else {
        nstate.submitDisabled = false        
      }
      break;
    case 'PROCESS_CHECKOUT':
      var dispatch = action.payload.dispatch
      nstate.paymentComplete = action.payload.paymentComplete
      nstate.paymentError = action.payload.paymentError
      if (nstate.paymentComplete) {
          nstate = clearCart(nstate)
      } else {
        var msg = {error: nstate.paymentError, address: nstate.address}
        var email = nstate.address.email
        setTimeout(
          function() {
            dispatch({type: "CONTACT_FORM", payload: {msg, email} })
          }
        , 10)
      }
      nstate.submitDisabled = false
      break;
    case 'CLEAR_FOCUS':
      nstate.focus = ""
      break;
  }
  nstate.total = calculateTotal(nstate.cart_items, nstate.country_short)
  nstate.shipping = calculateShipping(nstate.cart_items, nstate.country_short)
  return Immutable.fromJS(nstate)
}
