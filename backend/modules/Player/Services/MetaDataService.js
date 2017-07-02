import fs from 'fs'

const AWS = require('aws-sdk');
const uuidV4 = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient();

var env = "prod"
// TODO: ge this from the config: c[env]['player_metadata']['play_metadata']
var tablename = "play_metadata"

export const getMeta = () => {
    const params = {
        TableName : tablename
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

export const getMetaById = (id) => {
    const params = {
        TableName: tablename,
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
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                return resolve(data);
            }
        });
    });
};

export const insertMeta = (data) => {
    const idOfNewElement = uuidV4();
    const params = {
        TableName: tablename,
        Item: {
            "id": idOfNewElement,
            "meta": data.meta,
            "type" : data.type

        }
    };
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {

                return resolve(idOfNewElement);
            }
        });
    });
};

export const deleteMeta = (id) => {
    const params = {
        TableName: tablename,
        Key: {
            "id": id.toString()
        }
    };
    return new Promise((resolve, reject) => {
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {

                return resolve(data);
            }
        });
    });
};

export const updateMeta = (id, data) => {

    const params = {
        TableName: tablename,
        Key: {
            "id": id
        },
        UpdateExpression: "set #dur = :dur, #pos = :pos, #sk = :sk",
        ExpressionAttributeNames: {
            "#dur": "duration",
            "#pos" : "position",
            "#sk" : "seek"
        },
        ExpressionAttributeValues: {
            ":dur": data.duration,
            ":pos": data.position,
            ":sk": data.seek,

        },
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {

        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(err);
            } else {

                return resolve(data);
            }
        });
    });
};

