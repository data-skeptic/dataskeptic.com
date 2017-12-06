var PrintfulClient = require('./printfulclient.js');
var key = 'srpzc6en-ogi6-edom:n0ln-5zavj5mnhcxn';

const order = require('./order-template.json')
var items = order['items']

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

var name = "Kyle Polich"
var address1 = "4158 Sutro Ave"
var city = "Los Angeles"
var state = "CA"
var country_code = "US"
var zip = "90008"

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
