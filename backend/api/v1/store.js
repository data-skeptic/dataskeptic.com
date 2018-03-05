const express = require('express')

const StoreServices = require('../../modules/store/services/StoreServices')

module.exports = cache => {
  const router = express.Router()

  router.get('/', function(req, res) {
    StoreServices.storeList(cache().products)
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })
  return router
}
