import express from 'express'
import httpProxy from 'http-proxy'
import next from 'next'
import path from 'path'
import favicon from 'serve-favicon'
import config from './config'
import routes from './routes'

// set up next
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const targetUrl = `http://${config.apiHost}:${config.apiPort}`

// set up proxy
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
})

app.prepare().then(() => {
  const server = express()

  // Proxy to API server
  server.use('/api', (req, res) => {
    proxy.web(req, res, { target: targetUrl })
  })

  server.use(favicon(path.join(__dirname, 'static', 'favicon.png')))

  server.use(express.static(path.join(__dirname, 'static')))

  server.use(handle)


  if (config.port) {
    server.listen(config.port, err => {
      if (err) {
        console.error(err) // eslint-disable-line no-console
      }
      console.info(
        '----\n==> ✅  %s is running, talking to API server on %s.',
        config.app.title,
        config.apiPort
      ) // eslint-disable-line no-console
      console.info(
        '==> 💻  Open http://%s:%s in a browser to view the app.',
        config.host,
        config.port
      ) // eslint-disable-line no-console
    })
  } else {
    console.error(
        '==>     ERROR: No PORT environment variable has been specified'
    ) // eslint-disable-line no-console
    console.log('config', config)
  }
})
