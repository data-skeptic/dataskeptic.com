//const tablename = "dscom-related-content";
const tablename = "test";
export const getRelatedContent = (uri, docClient) => {
    const params = {
        TableName : tablename,
        KeyConditionExpression: "#idd = :idd",
        ExpressionAttributeNames: {
            "#idd": "uri"
        },
        ExpressionAttributeValues: {
            ":idd": uri
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

export const deleteRelatedContentByUri = (uri, position, docClient) => {
    const params = {
        TableName : tablename,
        Key : {
            "uri" : uri
        },
        UpdateExpression : "Remove #rel["+ position + "]",
        ExpressionAttributeNames : {
            "#rel" : "related"
        },

        ReturnValues: "ALL_OLD"
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

