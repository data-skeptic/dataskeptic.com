const path = require('path')
const AWS = require('aws-sdk')

const proposalsDocs = new AWS.DynamoDB.DocumentClient()

const RFC_TABLE_NAME = 'rfc'
const LATEST_RFC_ID = 'test-request'

function fetchCurrentRFC() {
  const params = {
    TableName: RFC_TABLE_NAME,
    Key: {
      id: LATEST_RFC_ID
    }
  }

  return new Promise((res, rej) => {
    proposalsDocs.scan(params, function(err, data) {
      if (err) {
        rej(err)
      } else {
        console.log(data.Items)
        return res(data.Items)
      }
    })
  })
}

export const getRFC = () => {
  return fetchCurrentRFC()
}
