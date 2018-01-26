var PrintfulClient = require('./printfulclient')

function place_order(printful_key, customer, designId, size, ok_callback, error_callback) {
    var confirm = 0
    // https://www.printful.com/docs/orders
    var variantMap = {
                  "S": 474
                , "M": 505
                ,"L": 536
                ,"XL": 567
                ,"2XL": 598
                ,"3XL": 629
            }
    var variant_id = variantMap[size]
    var quantity = 1
    var product_name = "Data Skeptic " + designId + " t-shirt, size " + size
    if (designId == "ai") {
      var url = "https://s3.amazonaws.com/dataskeptic.com/img/merch/printful-t-shirt-ai.png"
    } else {
      var url = "https://s3.amazonaws.com/dataskeptic.com/img/merch/printful-t-shirt-logo.png"
    }
  	var pf = new PrintfulClient(printful_key);
    var oitem = {
      variant_id: variant_id,
      quantity,
      files: [{url}]
    }
    var oitems = [oitem]
    var d = {
        recipient:  {
            name         : customer.name,
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

    return pf.post('orders',
        d
        ,{confirm: confirm}
    ).success(ok_callback).error(error_callback);
}

module.exports = place_order;
