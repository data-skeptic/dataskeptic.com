var wrapper = require('./wrapper.js')

var config = require('../../config/config.json')

var PrintfulClient = require('./printfulclient.js');
var key = config['prod']['printful']['api']

var name = "Andy Lawton"
var address1 = "3 The Oakes"
var address2 = "Norton"
var city = "Sheffield"
var state = "Yorkshire"
var country_code = "GB"
var zipcode = "S88BA"
var size = "XL"
var designId = "ai"

var customer = {
    name,
    address1,
    address2,
    city,
    state,
    country_code,
    zipcode
}

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

wrapper(key, customer, designId, size, ok_callback, error_callback)

