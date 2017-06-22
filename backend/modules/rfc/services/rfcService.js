const path = require('path');
const AWS = require("aws-sdk");

const proposalsDocs = new AWS.DynamoDB.DocumentClient();

const RFC_TABLE_NAME = 'rfc';
const LATEST_RFC_ID = 'test-request';

function fetchCurrentRFC() {
    const params = {
        TableName: RFC_TABLE_NAME,
        Key: {
            id: LATEST_RFC_ID
        }
    };

    return new Promise((res, rej) => {
        proposalsDocs.get(params, function(err, data) {
            if (err) {
                rej(err);
            } else {
                res(data['Item']);
            }
        });
    });
}


export const getRFC = () => {
  return fetchCurrentRFC()
};
