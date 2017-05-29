const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
let User = require("../Models/User");

export const insertIntoDatabase = (data) => {
    let userData = new User({
        firstName: data.firstName,
        fullName: data.fullName,
        type: data.type || "q",
        linkedinId: data.linkedinId,
        profilePic: data.profilePic || "q",
        membership: data.membership || "q",
        active: data.active || "q"
    });
    const params = {
        TableName : "dataskeptic_users",
        Item : {
            userData
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