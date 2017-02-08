var AWS = require("aws-sdk");

module.exports = {
  get_invoice: function(req, res) {
    var params = req['params']
    var id = req.query.id
    var invoice = undefined
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName : "invoices",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id":id
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            var items = data['Items']
            if (items.length < 1) {
              var e = {"error": true, "msg": "not found"}
              console.log("invoice not found: " + id)
              return res.status(400).end(JSON.stringify(e))
            }
            var invoice = items[0]
            console.log("invoice found")
            return res.status(200).end(JSON.stringify(invoice))
        }
    });
  }
}