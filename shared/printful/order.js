var wrapper = require('./wrapper.js')

var config = require('../../config/config.json')

var PrintfulClient = require('./printfulclient.js');
var key = config['prod']['printful']['api']

var name = ""
var address1 = ""
var address2 = ""
var city = "San Francisco"
var state = "CA"
var country_code = "US"
var zipcode = "94117-3608"
var size = "XL"
var quantity = 1

var variantMap = {
              "S": 474
            , "M": 505
            ,"L": 536
            ,"XL": 567
            ,"2XL": 598
            ,"3XL": 629
        }

var variant_id = variantMap[size]

var customer = {
    name,
    address1,
    address2,
    city,
    state,
    country_code,
    zipcode
}

var items = [
    {variant_id, quantity}
]

var ok_callback = function(data, info){
    console.log('SUCCESS');
    console.log(JSON.stringify(data));
    //If response includes paging information, show total number available
    if(info.total_items){
        console.log('Total items available: '+info.total_items);
    }
}

var error_callback = function(message, info){
    console.log('ERROR ' + message);
    //Dump raw response
    console.log(info.response_raw);
}

wrapper(key, customer, items, ok_callback, error_callback)

