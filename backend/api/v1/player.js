const express = require('express')
const MetaDataService = require('../../modules/Player/Services/MetaDataService')

module.exports = cache => {
  const router = express.Router()
  router.get('/', function(req, res) {
    MetaDataService.getMeta()
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
  router.get('/:id', function(req, res) {
    MetaDataService.getMetaById(req.params.id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
  router.post('/', function(req, res) {
    /*
    MetaDataService.insertMeta(req.body)
      .then(id => {
        MetaDataService.getMetaById(id).then(data => {
          res.send(data)
        })
      })
      .catch(err => {
        res.send(err)
      })
    */
    res.send({})
  })
  router.put('/:id', function(req, res) {
    MetaDataService.updateMeta(req.params.id, req.body)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
  router.delete('/:id', function(req, res) {
    /*
    MetaDataService.deleteMeta(req.params.id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
    */
    res.send({})
  })

  return router
}
