import Immutable from 'immutable'
import { fromJS } from 'immutable'
import querystring from 'querystring'
import axios from 'axios'
import snserror from '../SnsUtil'
import PrintfulClient from '../printful/printfulclient'
import Request from '../Request'

var env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const config = require('../../config/config.json')

var printful_key = config[env]['printful']['api']

var base_url = 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/' + env

export const ADD_JOB = 'ADD_JOB'
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS'
export const ADD_JOB_FAIL = 'ADD_JOB_FAIL'

const init = {
  email_send_msg: '',
  pending_blogs: [],
  recent_blogs: [],
  add_related_msg: '',
  from: 'orders@dataskeptic.com',
  to: 'kylepolich@gmail.com',
  subject: 'Hello from Data Skeptic',
  send_headers: '1',
  body: '',
  templates: [
    {
      name: 'Order confirmation',
      subject: 'dataskeptic.com - order confirmed',
      body:
        "Hi {name},\n\nWe wanted to let you know that your order has processed and we'll send another confirmation shortly when it ships.\n\nThanks for your support,\n\nThe Data Skeptic team"
    },
    {
      name: 'Order shipped',
      subject: 'dataskeptic.com - order shipped',
      body:
        'Hi {name},\n\nWe wanted to let you know that your recent order has shipped.\n\nThanks for your support,\n\nThe Data Skeptic team'
    },
    {
      name: 'Coaching renewing',
      subject: 'dataskeptic.com - reminder of upcoming charge',
      body:
        'Hi {name},\n\nWe wanted to let you know that your monthly coaching plan will recur on {date}.  If you have any questions or want to pause on our collaboration, you can reply to this email or reach out to Kyle directly.  No action is needed on your part to continue.\n\nThanks!'
    }
  ],
  order: {
    step: 'init',
    productId: undefined,
    errorMsg: '',
    designId: 'orig | ai',
    color: 'Black',
    quantity: '1',
    size: '',
    variant_id: '',
    customerName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    country: 'US',
    spError: ''
  },
  isAdmin: false,
  loggedInAdmin: {},
  jobs: {
    processing: false,
    success: false,
    error: null
  }
}

const defaultState = Immutable.fromJS(init)

export default function adminReducer(state = defaultState, action) {
  var nstate = state.toJS()
  var apromise = undefined
  switch (action.type) {
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
      nstate.send_headers = action.payload
    case 'UPDATE_ORDER':
      var u = action.payload
      var keys = Object.keys(u)
      for (var i = 0; i < keys.length; i++) {
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
      break
    case 'ORDER_POPULATE':
      var order = action.payload
      var size = ''
      var items = order.items
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item.description == 'Data Skeptic t-shirt') {
          var p = item.parent
          var sizeKey = p.split('_')[2]
          //size = sizeMap[sizeKey]
          size = sizeKey
        }
      }
      nstate.order.errorMsg = ''
      ;(nstate.order.quantity = '1'),
        (nstate.order.size = size),
        (nstate.order.customerName = order.shipping.name),
        (nstate.order.address1 = order.shipping.address.line1),
        (nstate.order.address2 = order.shipping.address.line2 || ''),
        (nstate.order.city = order.shipping.address.city),
        (nstate.order.state = order.shipping.address.state || ''),
        (nstate.order.zipcode = order.shipping.address.postal_code),
        (nstate.order.country = order.shipping.address.country),
        (nstate.order.spError = '')
      break
    case 'SET_ORDER_STEP':
      nstate.order.step = action.payload
      break
    case 'SET_ORDER_PRODUCT_ID':
      var productId = action.payload
      nstate.order.productId = productId
      break
    case 'SET_ORDER_ERROR_MSG':
      nstate.order.errorMsg = action.payload
      break
    case 'SET_ORDER_SP_ERROR_MSG':
      nstate.order.spError = action.payload
      break
    case 'PLACE_ORDER':
      var dispatch = action.payload
      nstate.order.spError = 'Placing order...'
      var order = nstate.order
      console.log(JSON.stringify(order))

      var name = order['customerName']
      var address1 = order['address1']
      var address2 = order['address2']
      var city = order['city']
      var state = order['state']
      var country_code = order['country']
      var zipcode = order['zipcode']
      var size = order['size']
      var designId = order['designId']

      var quantity = parseInt(order['quantity'])
      var variant_id = order['variant_id']

      var customer = {
        name,
        address1,
        address2,
        city,
        state,
        country_code,
        zipcode
      }
      var url = '/api/store/order/add'
      var payload = { customer, designId, size }
      axios
        .post(url, payload)
        .then(function(result) {
          console.log(result)
          dispatch({
            type: 'SET_ORDER_SP_ERROR_MSG',
            payload: result['data']['msg']
          })
        })
        .catch(err => {
          console.log(err)
          var jstr = JSON.stringify(err)
          dispatch({ type: 'SET_ORDER_SP_ERROR_MSG', payload: jstr })
        })
      break
    case 'INIT_ORDERS':
      var dispatch = action.payload.dispatch
      var uri = 'https://api.scalablepress.com/v2/categories'
      nstate.order.step = 'fetch_categories'
      axios
        .get(uri)
        .then(function(result) {
          var categories = result['data']
          for (var i in categories) {
            var category = categories[i]
            if (category['name'] == 'Short Sleeve Shirts') {
              var url2 = category['url']
              dispatch({
                type: 'SET_ORDER_STEP',
                payload: 'fetch_products'
              })
              axios
                .get(url2)
                .then(function(result2) {
                  var productId = 'Not found'
                  var products = result2['data']['products']
                  for (var i in products) {
                    var product = products[i]
                    //if (product['name'] == 'Gildan Ultra Blend 50/50 T') {
                    if (product['name'] == 'Fruit of the Loom Cotton T') {
                      productId = product['id']
                    }
                  }
                  if (productId != 'Not found') {
                    var step = 'ready'
                    dispatch({
                      type: 'SET_ORDER_STEP',
                      payload: step
                    })
                    dispatch({
                      type: 'SET_ORDER_PRODUCT_ID',
                      payload: productId
                    })
                  }
                })
                .catch(err => {
                  var step = 'error'
                  var errorMsg = JSON.stringify(err)
                  dispatch({
                    type: 'SET_ORDER_STEP',
                    payload: step
                  })
                  dispatch({
                    type: 'SET_ORDER_ERROR_MSG',
                    payload: errorMsg
                  })
                })
            }
          }
        })
        .catch(err => {
          var errorMsg = JSON.stringify(err)
          dispatch({
            type: 'SET_ORDER_ERROR_MSG',
            payload: errorMsg
          })
        })
      break
    case 'RELATED_CONTENT_ADD':
      var payload = action.payload
      var dispatch = payload['dispatch']
      var url = base_url + '/blog/relatedcontent/add'
      nstate.add_related_msg = 'Saving...'
      axios
        .post(url, payload['data'])
        .then(function(result) {
          dispatch({
            type: 'RELATED_CONTENT_LIST',
            payload: { dispatch, add_related_msg: 'Saved!' }
          })
        })
        .catch(err => {
          console.log(err)
          var errorMsg = JSON.stringify(err)
          snserror('ADD_RELATED_CONTENT', errorMsg)
        })
      break
    case 'RELATED_CONTENT_LIST':
      var dispatch = action.payload.dispatch
      if (action.payload.add_related_msg != undefined) {
        nstate.add_related_msg = action.payload.add_related_msg
      }
      var url = base_url + '/blog/relatedcontent/list'
      axios
        .get(url)
        .then(function(result) {
          var rcs = result['data']
          dispatch({
            type: 'RELATED_CONTENT_LIST_SET',
            payload: rcs
          })
        })
        .catch(err => {
          console.log(err)
          var errorMsg = JSON.stringify(err)
          snserror('RELATED_CONTENT_LIST', errorMsg)
        })
      break
    case 'RELATED_CONTENT_LIST_SET':
      var rcs = action.payload
      nstate.relatedcontent = rcs
      break
    case 'RELATED_CONTENT_DELETE':
      var payload = action.payload
      var nlist = []
      var content_id = payload['content_id']
      var i = 0
      while (i < nstate.relatedcontent.length) {
        var rc = nstate.relatedcontent[i]
        if (rc['content_id'] != content_id) {
          nlist.push(rc)
        }
        i += 1
      }
      nstate.relatedcontent = nlist
      var url = base_url + '/blog/relatedcontent/delete'
      axios
        .post(url, payload)
        .then(function(result) {})
        .catch(err => {
          console.log(err)
          var errorMsg = JSON.stringify(err)
          snserror('RELATED_CONTENT_DELETE', errorMsg)
        })
      break

    case ADD_JOB:
      nstate.jobs.processing = true
      nstate.jobs.success = false
      nstate.jobs.error = null
      break
    case ADD_JOB_SUCCESS:
      nstate.jobs.processing = false
      nstate.jobs.success = true
      nstate.jobs.error = null
      break
    case ADD_JOB_FAIL:
      nstate.jobs.processing = false
      nstate.jobs.success = false
      nstate.jobs.error = action.payload.error
      break
  }
  return Immutable.fromJS(nstate)
}

export const addJob = job => {
  return dispatch => {
    dispatch(addJobRequest(job))

    Request.post(`/api/v1/jobs`, job)
      .then(result => dispatch(addJobSuccess(result.data)))
      .catch(err => dispatch(addJobFail(err.data.error)))
  }
}

export const addJobRequest = job => ({
  type: ADD_JOB,
  payload: {
    ...job
  }
})

export const addJobSuccess = result => ({
  type: ADD_JOB_SUCCESS,
  payload: { result }
})

export const addJobFail = error => ({
  type: ADD_JOB_FAIL,
  payload: { error }
})
