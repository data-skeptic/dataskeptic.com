const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

export const singIn = (mail, password) => {
    let params = {
        TableName: "dataskeptic_users",
        FilterExpression: "#mail = :mail and #pswd = :password",
        ExpressionAttributeNames: {
            "#pswd": "password",
            "#mail": "email"
        },
        ExpressionAttributeValues: {
            ":mail": mail,
            ":password" : password
        }
    };
    return new Promise((resolve, reject) => {
        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                return resolve(data);
            }
        });
    });
};