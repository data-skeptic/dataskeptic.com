const AWS = require('aws-sdk');
const uuidV4 = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient();
import User from "../Models/User";
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const map = require('lodash/map');

export const insertIntoDatabase = (data) => {
    let idOfNewElement = uuidV4();
    let email = data.email;
    let password = randomstring.generate(7);
    let userData = new User({
        firstName: data.firstName,
        fullName: data.fullName,
        type: data.type || "false",
        email: data.email,
        password : password,
        linkedinId: data.linkedinId,
        profilePic: data.profilePic || "null",
        membership: data.membership || "null",
        active: data.active || "false"
    });
    const params = {
        TableName : "dataskeptic_users",
        Item : {
            "id" : idOfNewElement,
            ...userData
        }
    };
    console.log("Adding a new item...");
    return new Promise((resolve, reject) => {
        docClient.put(params, (err, data) =>{
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("Added item:", JSON.stringify(data));
                sendEmail(email, '<b>Your new password is: </b>' + password);
                return resolve(idOfNewElement);
            }
        });
    });

};

export const getUserById = (id) => {
    let params = {
        TableName: "dataskeptic_users",
        KeyConditionExpression: "#idd = :idd",
        ExpressionAttributeNames: {
            "#idd": "id"
        },
        ExpressionAttributeValues: {
            ":idd": id
        }
    };
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                data.Items.forEach(function(item) {
                    console.log(item);
                    delete item.password
                });
                return resolve(data.Items);
            }
        });
    });

};

export const getUserByLinkedinId = (id) => {
    let params = {
        TableName : "dataskeptic_users",
        FilterExpression: "#idd = :idd",
        ExpressionAttributeNames: {
            "#idd": "linkedinId"
        },
        ExpressionAttributeValues: {
            ":idd": id
        }
    };
    return new Promise((resolve, reject) => {
        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                data.Items.forEach(function(item) {
                    console.log(item);
                    delete item.password
                });
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                return resolve(data);
            }
        });
    });
};

export const changeActiveStatus = (id, status) => {
    let params = {
        TableName: "dataskeptic_users",
        Key: {
            "id": id
        },
        UpdateExpression: "set #act = :status",
        ExpressionAttributeNames: {
            "#act": "active"
        },
        ExpressionAttributeValues: {
            ":status": status

        },
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        console.log("Updating the item...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                return resolve(data);
            }
        });
    });
};

export const updateById = (id, data) => {
    let params = {
        TableName: "dataskeptic_users",
        Key: {
            "id": id
        },
        UpdateExpression: "set #act = :status, #pic = :pic, #fullN = :full, #firstN = :name, #tp = :type, #mail = :email, #membership = :memb",
        ExpressionAttributeNames: {
            "#act": "active",
            "#pic": "profilePic",
            "#fullN": "fullName",
            "#firstN": "firstName",
            "#tp": "type",
            "#mail": "email",
            "#membership" : "membership"
        },
        ExpressionAttributeValues: {
            ":status": data.active,
            ":pic" : data.profilePic,
            ":full" : data.fullName,
            ":name" : data.firstName,
            ":type" : data.type,
            ":email" : data.email,
            ":memb" : data.membership

        },
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        console.log("Updating the item...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                return resolve(data);
            }
        });
    });
};

export const sendEmail = (mail, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'orkengolub@gmail.com',
            pass: '15011998q'
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <orkengolub@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hi: ', // plain text body
        html: text// html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};

export const cancelMembership = (id) => {
    let params = {
        TableName: "dataskeptic_users",
        Key: {
            "id": id
        },
        UpdateExpression: "set #memb = :status",
        ExpressionAttributeNames: {
            "#memb": "membership"
        },
        ExpressionAttributeValues: {
            ":status": false

        },
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        console.log("Updating the item...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                sendEmail("oleg@thespoon.co", "user with  id " + id + " canceled his membership");
                return resolve(data);
            }
        });
    });
};

export const startMembership = (id) => {
    let params = {
        TableName: "dataskeptic_users",
        Key: {
            "id": id
        },
        UpdateExpression: "set #memb = :status",
        ExpressionAttributeNames: {
            "#memb": "membership"
        },
        ExpressionAttributeValues: {
            ":status": true

        },
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        console.log("Updating the item...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                sendEmail("oleg@thespoon.co", "user with  id " + id + " started his membership");
                return resolve(data);
            }
        });
    });
};