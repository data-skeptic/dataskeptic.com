import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"

const init = {
    "email_send_msg": "",
	"from": "orders@dataskeptic.com",
	"to": "kylepolich@gmail.com",
	"subject": "Hello from Data Skeptic",
    "send_headers": "1",
	"body": "",
	"templates": [
		{
			"name": "Order confirmation", 
			"subject": "dataskeptic.com - order confirmed",
			"body": "Hi {name},\n\nWe wanted to let you know that your order has processed and we'll send another confirmation shortly when it ships.\n\nThanks for your support,\n\nThe Data Skeptic team"
		},
        {
            "name": "Order shipped", 
            "subject": "dataskeptic.com - order shipped",
            "body": "Hi {name},\n\nWe wanted to let you know that your recent order has shipped.\n\nThanks for your support,\n\nThe Data Skeptic team"
        },
        {
            "name": "Coaching renewing", 
            "subject": "dataskeptic.com - reminder of upcoming charge",
            "body": "Hi {name},\n\nWe wanted to let you know that your monthly coaching plan will recur on {date}.  If you have any questions or want to pause on our collaboration, you can reply to this email or reach out to Kyle directly.  No action is needed on your part to continue.\n\nThanks!"
        }
	],
    "order": {
        step: 'init',
        productId: undefined,
        errorMsg: '',
        designId: '58196cb41338d457459d579c',
        color: 'Black',
        quantity: '1',
        size: '',
        customerName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'US',
        spError: ''
    },
	invoice: undefined
}

const defaultState = Immutable.fromJS(init);

var sizeMap = {
    "S": "sml", 
    "M": "med", 
    "L": "lrg", 
    "XL": "xlg", 
    "2L": "xxl", 
    "3XL": "xxxl", 
    "4XL": "xxxxl"
}

export default function adminReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'SET_EMAIL_FROM':
    	nstate.from = action.payload
    	break
    case 'SET_EMAIL_TO':
        nstate.to = action.payload
        break
    case 'SET_EMAIL_SEND_MSG':
        nstate.email_send_msg = action.payload
        break
    case 'SET_EMAIL_SUBJECT':
    	nstate.subject = action.payload
    	break
    case 'SET_EMAIL_BODY':
    	nstate.body = action.payload
    	break
    case 'SET_EMAIL_HEADER':
        console.log("action.payload")
        console.log(action.payload)
        nstate.send_headers = action.payload
    case 'UPDATE_ORDER':
        var u = action.payload
        var keys = Object.keys(u)
        for (var i=0; i < keys.length; i++) {
            var key = keys[i]
            var val = u[key]
            nstate.order[key] = val
        }
        break
    case 'PICK_EMAIL_TEMPLATE':
    	var template = action.payload
    	var i = 0
    	while (i < nstate.templates.length) {
    		var t = nstate.templates[i]
    		if (t['name'] == template) {
    			nstate.subject = t['subject']
    			nstate.body = t['body']
    		}
    		i += 1
    	}
    case 'SEND_EMAIL':
    	var header = "https://s3.amazonaws.com/dataskeptic.com/img/png/email-header.png"
    	var header = "https://s3.amazonaws.com/dataskeptic.com/img/png/email-footer.png"
    	break;
    case 'ORDER_POPULATE':
        var order = action.payload
        var size = ''
        var items = order.items
        for (var i=0; i < items.length; i++) {
            var item = items[i]
            if (item.description == "Data Skeptic t-shirt") {
                var p = item.parent
                var sizeKey = p.split("_")[2]
                size = sizeMap[sizeKey]
            }
        }
        nstate.order.errorMsg = ''
        nstate.order.quantity = '1',
        nstate.order.size = size,
        nstate.order.customerName = order.shipping.name,
        nstate.order.address1 = order.shipping.address.line1,
        nstate.order.address2 = order.shipping.address.line2 || "",
        nstate.order.city = order.shipping.address.city,
        nstate.order.state = order.shipping.address.state || "",
        nstate.order.zipcode = order.shipping.address.postal_code,
        nstate.order.country = order.shipping.address.country,
        nstate.order.spError = ''
        break;
    case 'SET_ORDER_STEP':
        nstate.order.step = action.payload
        break;
    case 'SET_ORDER_PRODUCT_ID':
        var productId = action.payload
        nstate.order.productId = productId
        break;
    case 'SET_ORDER_ERROR_MSG':
        nstate.order.errorMsg = action.payload
        break;
    case 'SET_ORDER_SP_ERROR_MSG':
        nstate.order.spError = action.payload
        break;
    case 'PLACE_ORDER':
        var dispatch = action.payload
        nstate.order.spError = "Ordering..."
        var order = nstate.order
        var data = {
          'type': 'dtg',
          'products[0][id]': order.productId,
          'address[name]': order.customerName,
          'products[0][color]': order.color,
          'products[0][quantity]': order.quantity,
          'products[0][size]': order.size,
          'address[address1]': order.address1,
          'address[address2]': order.address2,
          'address[city]': order.city,
          'address[state]': order.state,
          'address[zip]': order.zipcode,
          'address[country]': order.country,
          'designId': order.designId
        }
        var url = "/api/order/create"
        var sreq = querystring.stringify(data)
        var config = {
            'Content-Type' : "application/x-www-form-urlencoded"
        };
        axios
            .post(url, sreq, config)
            .then(function(r) {
                console.log("OK!!!")
                var resp = r['data']
                console.log(resp)
                var errorMsg = "Success!"
                dispatch({type: "SET_ORDER_SP_ERROR_MSG", payload: errorMsg })
            })
            .catch(function(err) {
                console.log("api error")
                var resp = err['data']
                var jstr = JSON.stringify(resp['response'])
                var errorMsg = jstr
                dispatch({type: "SET_ORDER_SP_ERROR_MSG", payload: errorMsg })
            })
        break
    case 'INIT_ORDERS':
        var dispatch = action.payload.dispatch
        var uri = "https://api.scalablepress.com/v2/categories"
        nstate.order.step = 'fetch_categories'
        axios
            .get(uri)
            .then(function(result) {
                var categories = result['data']
                for (var i in categories) {
                    var category = categories[i]
                    if (category['name'] == 'Short Sleeve Shirts') {
                        var url2 = category['url']
                        dispatch({type: "SET_ORDER_STEP", payload: 'fetch_products' })
                        axios
                            .get(url2)
                            .then(function(result2) {
                                var productId = "Not found"
                                var products = result2['data']['products']
                                for (var i in products) {
                                    var product = products[i]
                                    if (product['name'] == 'Gildan Ultra Blend 50/50 T') {
                                        productId = product['id']
                                    }
                                }
                                if (productId != "Not found") {
                                    var step = 'ready'
                                    dispatch({type: "SET_ORDER_STEP", payload: step })
                                    dispatch({type: "SET_ORDER_PRODUCT_ID", payload: productId })
                                }
                            })
                            .catch((err) => {
                                var step = 'error'
                                var errorMsg = JSON.stringify(err)
                                dispatch({type: "SET_ORDER_STEP", payload: step })
                                dispatch({type: "SET_ORDER_ERROR_MSG", payload: errorMsg })
                            })
                    }
                }
            })
            .catch((err) => {
                var errorMsg = JSON.stringify(err)
                dispatch({type: "SET_ORDER_ERROR_MSG", payload: errorMsg })
            })
        break;
    case 'ADD_INVOICE':
      nstate.invoice = action.payload
      break
  }
  return Immutable.fromJS(nstate)
}