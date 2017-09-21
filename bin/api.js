#!/usr/bin/env node
function run() {
  if (process.env.NODE_ENV !== 'production') {
    if (
      !require('piping')({
        hook: true,
        ignore: /(\/\.|~$|\.json$)/i
      })
    ) {
      return
    }
  }
  require('./node.babel') // babel registration (runtime transpilation for node)
  require('../api')
}

run()
