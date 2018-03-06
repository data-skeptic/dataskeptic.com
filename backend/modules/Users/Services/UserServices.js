const AWS = require('aws-sdk')

const uuidV4 = require('uuid/v4')
const docClient = new AWS.DynamoDB.DocumentClient()
import User from '../Models/User'

export const insertIntoDatabase = data => {
  let idOfNewElement = uuidV4()
  let userData = new User({
    firstName: data.firstName,
    fullName: data.fullName,
    type: data.type || 'q',
    email: data.email,
    linkedinId: data.linkedinId,
    profilePic: data.profilePic || 'q',
    membership: data.membership || 'q',
    active: data.active || 'q'
  })
  const params = {
    TableName: 'dataskeptic_users',
    Item: {
      id: idOfNewElement,
      ...userData
    }
  }

  return new Promise((resolve, reject) => {
    docClient.put(params, function(err, data) {
      if (err) {
        console.error(
          'Unable to add item. Error JSON:',
          JSON.stringify(err, null, 2)
        )
        return reject(err)
      } else {
        return resolve(idOfNewElement)
      }
    })
  })
}

export const getUserById = id => {
  let params = {
    TableName: 'dataskeptic_users',
    KeyConditionExpression: '#idd = :idd',
    ExpressionAttributeNames: {
      '#idd': 'id'
    },
    ExpressionAttributeValues: {
      ':idd': id
    }
  }
  return new Promise((resolve, reject) => {
    docClient.query(params, function(err, data) {
      if (err) {
        console.error(
          'Unable to read item. Error JSON:',
          JSON.stringify(err, null, 2)
        )
        return reject(err)
      } else {
        return resolve(data.Items)
      }
    })
  })
}

export const getUserByLinkedinId = id => {
  let params = {
    TableName: 'dataskeptic_users',
    FilterExpression: '#idd = :idd',
    ExpressionAttributeNames: {
      '#idd': 'linkedinId'
    },
    ExpressionAttributeValues: {
      ':idd': id
    }
  }
  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data) {
      if (err) {
        console.error(
          'Unable to read item. Error JSON:',
          JSON.stringify(err, null, 2)
        )
        return reject(err)
      } else {
        return resolve(data.Items)
      }
    })
  })
}

export const changeActiveStatus = id => {
  let params = {
    TableName: 'dataskeptic_users',
    Key: {
      id: id
    },
    UpdateExpression: 'set info.en.#txt = :status',
    ExpressionAttributeNames: {
      '#act': 'active'
    },
    ExpressionAttributeValues: {
      ':status': true
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return new Promise((resolve, reject) => {
    docClient.update(params, function(err, data) {
      if (err) {
        console.error(
          'Unable to update item. Error JSON:',
          JSON.stringify(err, null, 2)
        )
        return reject(err)
      } else {
        return resolve(data)
      }
    })
  })
}
