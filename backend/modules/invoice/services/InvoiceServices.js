const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

export const getInvoice = (id) => {

    var invoice = undefined;
    var params = {
        TableName: "invoices",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": id
        }
    };

    return new Promise((resolve, reject) => {


        docClient.query(params, function (err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                var items = data['Items']
                if (items.length < 1) {
                    var e = {"error": true, "msg": "not found"}

                    return reject(JSON.stringify(e))
                }
                var invoice = items[0]

                return resolve(JSON.stringify(invoice))
            }
        });
    });
};

export const payInvoice = (id, stripe_key, req) => {
    return new Promise((resolve, reject) => {


        var stripe = require("stripe")(stripe_key)
        var amount = req.query.amount * 100 // Stripe wants it in pennies
        var token = req.query.token;
        var charge = stripe.charges.create({
                amount: amount,
                currency: "usd",
                description: "Invoice #" + id,
                source: token,
            },

            function (err, charge) {
                if (err) {
                    console.log(err)
                    var resp = {
                        "error": true,
                        "msg": "Unable to complete transaction.  Please contact kyle@dataskeptic.com for assistance."
                    }
                    return reject(JSON.stringify(resp))
                }
                var resp = {"error": false, "msg": ""}
                return resolve(JSON.stringify(resp))
            });
    })
}