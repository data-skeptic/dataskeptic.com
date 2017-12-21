var PrintfulClient = require('./printfulclient.js');
var key = '';

const order = require('./order-template.json')
var items = order['items']

var name = "Kyle Polich"
var address1 = "4158 Sutro Ave"
var city = "Los Angeles"
var state = "CA"
var country_code = "US"
var zip = "90008"

var variantMap = {
              "S": 474
            , "M": 505
            ,"L": 536
            ,"XL": 474
            ,"2XL": 598
            ,"3XL": 629
        }

var variant_id = variantMap[size]

items[0]['variant_id'] = variant_id
items[0]['product']['variant_id'] = variant_id


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

var pf = new PrintfulClient(key);

pf.post('orders',
    {
        recipient:  {
            name: name,
            address1: address1,
            city: city,
            state_code: state,
            country_code: country_code,
            zip: zip
        },
        items: items
    },
    {confirm: 1}
).success(ok_callback).error(error_callback);
