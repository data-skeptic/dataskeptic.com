import PrintfulClient from './printfulclient'

function place_order(printful_key, order, ok_callback, error_callback) {
    console.log("PLACE ORDER!!")
	var pf = new PrintfulClient(printful_key);

    var variantMap = {
          "sml": 474
        , "med": 505
        , "lrg": 536
        , "xlg": 474
        , "xxl": 598
        , "xxxL": 629
    }

    console.log(order.size)
    var variant_id = variantMap[order.size]
    console.log("variant_id = " + variant_id)

    var oitem =     {
      "variant_id": variant_id,
      "quantity": 1,
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
                name: order.customerName,
                address1: order.address1,
                address2: order.address2,
                city: order.city,
                state_code: order.state,
                country_code: order.country,
                zip: order.zipcode
            },
            items: oitems
        }
    console.log(JSON.stringify(d))

    pf.post('orders',
        d
        //,{confirm: 1}
    ).success(ok_callback).error(error_callback);
}

module.exports = place_order;
