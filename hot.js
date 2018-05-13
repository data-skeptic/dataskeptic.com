'use strict'

const webpack = require('webpack')
const wdm = require('webpack-dev-middleware')
const whm = require('webpack-hot-middleware')

const initHot = (app, config) => {
  const compiler = webpack(config)

  app.use(
    wdm(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    })
  )

  app.use(whm(compiler))

  console.log('Enable hotreload')
}

module.exports = initHot
