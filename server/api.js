import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import session from 'express-session'
import config from '../config'
import passport from 'passport'
import googleAuth from './auth/google'

const app = express()

import initCache from './initCache'
import endpoints from './endpoints'

async function run(cache) {
    app.use(bodyParser.json())
    app.use(morgan('combined'))
    app.use(
        session({
            secret: 'UvwDvTBzJXBVcPXJmkbHDHahAxU6AYFVbJDJyFKwBvGCDsxXgv',
            cookie: {
                maxAge: 86400000
            },
            resave: false,
            saveUninitialized: false
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    // turn on the auth services
    googleAuth()

    app.use(endpoints(cache));

    app.get('/v1/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/v1/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {
            const referer = req.headers.referrer || req.headers.referer
            const module = referer.split('/')[3]
            res.redirect(`/${module}`);
        });

    app.all('/auth/currentUser', (req, res) => {
        const user = req.user
        res.send({user})
    })

    app.all('/auth/logout', (req, res) => {
        req.logout();
        res.send({user: null})
    })

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