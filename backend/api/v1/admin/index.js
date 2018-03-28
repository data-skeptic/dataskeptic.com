import express from 'express'

module.exports = cache => {
  const router = express.Router()

  router.use((req, res, next) => {
    if (req.isAuthenticated()) {
      console.dir(req.user)
      // prevent unauthorized access
      return next()
    }

    res.status(401).send({
      success: false,
      error: `You have not access to execute this action`
    })
  })

  router.use('/tags', require('./tags')(cache))

  return router
}
