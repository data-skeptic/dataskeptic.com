var PrintfulClient = require('./printfulclient.js');
var key = 'sa9n9761-l8po-nes1:svvg-wh4xfayxwwcd';

const order = require('./order-template.json')
var items = order['items']

var name = "Kyle Polich"
var address1 = "4158 Sutro Ave"
var city = "Los Angeles"
var state = "CA"
var country_code = "US"
var zip = "90008"
var size = "XL"

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


var d = {
        recipient:  {
            name: name,
            address1: address1,
            city: city,
            state_code: state,
            country_code: country_code,
            zip: zip
        },
        items: items
    }

var d2s = '{"recipient":{"name":"Dave Clarke","address1":"Dalabacken 2","address2":" ","city":"Knivsta","state_code":"Uppsala","country_code":"se","zip":"74194"},"items":[{"variant_id":598,"quantity":1,"product":{"variant_id":598,"product_id":12},"custom_product":[],"files":[{"id":37766873,"type":"default","filename":"t-shirt.png","dpi":300,"created":1511289196,"preview_url":"https://d1yg28hrivmbqm.cloudfront.net/files/57c/57cc770e861106c42055789e4b0bab4b_preview.png"},{"id":37766924,"filename":"mockup_Flat-Front_Black.png","mime_type":"image/png","dpi":72,"preview_url":"https://d1yg28hrivmbqm.cloudfront.net/files/2c8/2c86623ea3caecd75518546e999c4933_preview.png"}],"options":[],"sku":null}]}'
var d2 = JSON.parse(d2s)

pf.post('orders',
    d2,
    {confirm: 1}
).success(ok_callback).error(error_callback);
