import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"

import PrintfulClient from './printfulclient'

var key = 'srpzc6en-ogi6-edom:n0ln-5zavj5mnhcxn';
var pf = new PrintfulClient(key);

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
	invoice: undefined,
    isAdmin : false,
    loggedInAdmin:{}
}

const defaultState = Immutable.fromJS(init);

var sizeMap = {
    "XS": "xsl",
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
        var header = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"><title>dataskeptic</title><style type="text/css">@media only screen and (min-width:481px) and (max-width: 600px){.whole-width{width:425px !Important;}.left-side{float: left !important;}.left-side img{width:100% !important;}.left-sideimg{width:100% !important;}.td_1{width:100% !important;float:left !important;}.td_12{width: 100% !important;float:left !important;}}@media only screen and (min-width:321px) and (max-width: 480px){.whole-width{width:355px !Important;}.hello{float: left !important;}.hello2{padding:0 0 0 14px !important;}.hello3{padding:0 15px 0 19px !important;}.hello4{padding:0px !important;}.access{padding:22px 0 25px 26px !important;}.pic{padding:25px 0 0 90px !important;}.left-side{float: left !important;}.left-side img{width:100% !important;}.left-sideimg{width:100% !important;}.td_1{width:100% !important;float:left !important;}.td_12{width: 100% !important;float:left !important;}.email_btn img{width:274px !important;}.centerr{text-align:center !important;}}@media only screen and (max-width:320px){.whole-width{width:300px !Important;}.left-side{float: left !important;}.left-side img{width:100% !important;}.left-sideimg{width:100% !important;}.td_1{width:100% !important;float:left !important;}.td_12{width: 100% !important;float:left !important;}.centerr{text-align:center !important;}}</style></head> <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center> <table bgcolor="#047595" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" > <tr> <td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" class="whole-width" style="width:600px;background:#002940;"><tr bgcolor="#3a3b3b"><td align="left" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding:20px 0 23px 0px;" align="center" valign="top" ><a title="dataskeptic" href="https://dataskeptic.com/"><img style="display:block;" width="180" align="center" src="https://dataskeptic.com/img/png/logo.png" border="0" alt=""/></a></td></tr></table></td></tr><tr bgcolor="#ffffff"><td align="left" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr> <td style="text-align:center;line-height:29px;font-size:24px;font-family:\'Helvetica Neue\',Arial,\'sans-serif\';padding:25px 30px 35px 30px;color:#333333;" align="left" valign="top" >`
        var footer = `</td></tr></table></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="whole-width" class="wrapper" style="width:600px;background:#3a3b3b;"><tr bgcolor="#3a3b3b"><td style="padding:5px 0 5px 0;" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr bgcolor="#3a3b3b"><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr> <td style="padding:13px 0 10px 0;" align="center" valign="top" ><a title="dataskeptic" style="display:inline-block;" href="https://www.facebook.com/dataskeptic"><img border="0" style="display:block;border-width:0;" src="https://gallery.mailchimp.com/aabfeb82daabbad28e6f6745e/images/a301be2d-6f98-445a-9737-70d211cacbf5.jpg" alt=""></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title="dataskeptic" style="display:inline-block;" href="https://twitter.com/dataskeptic"><img border="0" style="display:block;border-width:0;" src="https://gallery.mailchimp.com/aabfeb82daabbad28e6f6745e/images/fd5592b5-72f5-4f44-bd49-3bc5205f0a55.jpg" alt=""></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title="dataskeptic" style="display:inline-block;" href="https://youtube.com/dataskeptic"><img border="0" style="display:block;border-width:0;" src="https://gallery.mailchimp.com/aabfeb82daabbad28e6f6745e/images/e76d4bc1-5f25-4423-b5e3-8bdce65d5f83.jpg" alt=""></a></td></tr></table></td></tr></table></td></tr></table> </td></tr></table> </center> </body></html>`
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
                //size = sizeMap[sizeKey]
                size = sizeKey
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

        var ok_callback = function(r, info) {
            console.log("OK!!!")
            var resp = r['data']
            console.log(resp)
            var errorMsg = "Success!"
            dispatch({type: "SET_ORDER_SP_ERROR_MSG", payload: errorMsg })
        }

        var error_callback = function(err) {
            console.log("api error")
            var resp = err['data']
            var jstr = JSON.stringify(resp['response'])
            var errorMsg = jstr
            dispatch({type: "SET_ORDER_SP_ERROR_MSG", payload: errorMsg })
        }

        var variantMap = {
              "S": 474
            , "M": 505
            ,"L": 536
            ,"XL": 474
            ,"2XL": 598
            ,"3XL": 629
        }

        var variant_id = variantMap[nstate.order.size]

        var oitem =     {
          "variant_id": variant_id,
          "quantity": 1,
          "product": {"variant_id": variant_id, "product_id": 12},
          "custom_product": [],
          "files": [
            {
              "id": 37766873,
              "type": "default",
              "filename": "t-shirt.png",
              "dpi": 300,
              "created": 1511289196,
              "preview_url": "https://d1yg28hrivmbqm.cloudfront.net/files/57c/57cc770e861106c42055789e4b0bab4b_preview.png" 
            },
            {
              "id": 37766924,
              "filename": "mockup_Flat-Front_Black.png",
              "mime_type": "image/png",
              "dpi": 72,
              "preview_url": "https://d1yg28hrivmbqm.cloudfront.net/files/2c8/2c86623ea3caecd75518546e999c4933_preview.png" 
            }
          ],
          "options": [],
          "sku": null
        }

        var oitems = [oitem]

        pf.post('orders',
            {
                recipient:  {
                    name: order.customerName,
                    address1: order.address1,
                    address2: order.address2,
                    city: order.city,
                    state_code: order.state,
                    country_code: order.country,
                    zip: order.zipcode
                },
                items: oitems
            },
            {confirm: 1}
        ).success(ok_callback).error(error_callback);
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
                                    //if (product['name'] == 'Gildan Ultra Blend 50/50 T') {
                                    if (product['name'] == 'Fruit of the Loom Cotton T') {
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