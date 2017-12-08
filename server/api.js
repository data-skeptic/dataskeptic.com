import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import config from '../config'
import passport from 'passport'
const app = express()

import initCache from './initCache'
import endpoints from './endpoints'

async function run(cache) {
    app.use(bodyParser.json())
    app.use(morgan('combined'))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(endpoints(cache));

    if (config.apiPort) {
        app.listen(config.apiPort, err => {
            if (err) {
                console.error(err) // eslint-disable-line no-console
            }
            console.info('----\n==> 🌎  API is running on port %s', config.apiPort) // eslint-disable-line no-console
            console.info(
                '==> 💻  Send requests to http://%s:%s',
                config.apiHost,
                config.apiPort
            ) // eslint-disable-line no-console
        })
    } else {
        console.error(
            '==>     ERROR: No PORT environment variable has been specified'
        ) // eslint-disable-line no-console
    }
}

initCache(config.isProduction)
    .then((cache) => run(cache))