import axios from 'axios'

module.exports = {
  order_create: function(req, res, sp_key) {
    var obj = req.body
    var key = sp_key
    var t = 'Basic ' + new Buffer(':' + key).toString('base64')
    var config = {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      'Authorization': t
    };
    var instance = axios.create()
    instance.request({
      url: 'https://api.scalablepress.com/v2/quote',
      method: 'POST',
      headers: {},
      data: obj,
      withCredentials: true,
      auth: {
        username: '',
        password: key
      }
    }).then(function(resp) {
      var data = resp['data']
      var status = resp['status']
      if (status == 200) {
        var orderIssues = data['orderIssues']
        if (orderIssues != undefined && orderIssues.length > 0) {
          var resp = {status: "Order Issues", "response": resp}
          return res.status(400).end(JSON.stringify(resp))        
        } else {
          var orderToken = data['orderToken']
          console.log("orderToken="+orderToken)
          var i2 = axios.create()
          var obj2 = {orderToken}
          i2.request({
            url: 'https://api.scalablepress.com/v2/order',
            method: 'POST',
            headers: {},
            data: obj2,
            withCredentials: true,
            auth: {
              username: '',
              password: key
            }
          }).then(function(resp) {
            console.log("order complete")
            return res.status(200).end(JSON.stringify(resp))
          })
          .catch((err) => {
            console.log(err)
            var resp = {status: "Last Step Error", "response": err}
            return res.status(400).end(JSON.stringify(resp))
          })
        }
      } else {
        var resp = {status: "Status Not OK", "response": resp}
        return res.status(400).end(JSON.stringify(resp))        
      }
    })
    .catch((err) => {
      console.log(err)
      var resp = {status: "Error", "response": err}
      return res.status(400).end(JSON.stringify(resp))
    })
  }
}