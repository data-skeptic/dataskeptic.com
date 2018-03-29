import express from 'express'

module.exports = cache => {
  const router = express.Router()

  router.use((req, res, next) => {
    const isAdmin = req.isAuthenticated() && req.user.type === 'admin'
    return next()

    // prevent unauthorized access
    if (isAdmin) {
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
