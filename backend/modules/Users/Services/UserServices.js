const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
let User = require("../Models/User");

export const insertIntoDatabase = (data) => {
    User = new User(data);
    const params = {
        TableName : "dataskeptic_users",
        Item : {
            User
        }
    };
    console.log("Adding a new item...");
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("Added item:", JSON.stringify(data));
                return resolve(data);
            }
        });
    });

};