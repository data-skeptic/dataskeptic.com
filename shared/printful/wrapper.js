var PrintfulClient = require('./printfulclient')

function place_order(printful_key, customer, items, ok_callback, error_callback) {
  	var pf = new PrintfulClient(printful_key);
    var item = items[0]
    var variant_id = item['variant_id']
    var oitem =     {
      "variant_id": variant_id,
      "quantity": item['quantity'],
      "product": {"variant_id": variant_id, "product_id": 12},
      "files": [
        {
          "id": 37766873,
          "type": "default",
          "filename": "t-shirt.png",
          "dpi": 300,
          "created": 1511289196,
          "preview_url": "https://d1yg28hrivmbqm.cloudfront.net/files/57c/57cc770e861106c42055789e4b0bab4b_preview.png" 
        }
      ]
    }

    var oitems = [oitem]
    var d = {
        recipient:  {
            name         : customer.customer,
            address1     : customer.address1,
            address2     : customer.address2,
            city         : customer.city,
            state_code   : customer.state,
            country_code : customer.country_code,
            zip          : customer.zipcode
        },
        items: oitems
    }
    console.log(JSON.stringify(d))

    pf.post('orders',
        d
        ,{confirm: 1}
    ).success(ok_callback).error(error_callback);
}

module.exports = place_order;
