import express from 'express'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const LinkedinStrategy = require('./LinkedinStrategy').default
const UserServices = require('../Users/Services/UserServices');

export default function ({env}) {
    const router = express.Router()

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        const user = {
            id
        }

        done(user)
    })

    passport.use(LinkedinStrategy({env}))
    router.use(passport.initialize())
    router.use(passport.session())

    // REGULAR
    passport.use(
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
            }, function login(username, password, done) {
                const user = {
                    username,
                    password
                }

                if (!user) {
                    return done(Error('User not found'), null)
                } else {
                    return done(null, user)
                }
            }
        )
    )

    // REGULAR
    router.post('/auth/login', (req, res, next) => {
        passport.authenticate('local', {failWithError: true}, function (err, user, info) {
            if (err) {
                return res.status(403).send({message: err.message})
            }

            if (!user) {
                return res.status(403).send({message: 'System Error'})
            }

            req.logIn(user, err => {
                if (err) {
                    return res.status(403).send({message: err.message})
                }

                return res.redirect('/')
            })
        })(req, res, next)
    })

    // LINKEDIN
    router.all('/auth/login/linkedin', passport.authenticate('linkedin'))
    router.all('/auth/linkedin/activate', function (req, res){
        UserServices
            .changeActiveStatus(req.body)
            .then(status =>{
                res.redirect('/');
            })
    });
    router.get('/auth/linkedin/callback', function (req, res, next) {

        passport.authenticate('linkedin', {
            failWithError: true,
            failureFlash: true
        }, function (err, user, info) {
            return res.send(user);
          /*  if (err) {

                return res.status(403).send({message: err})
            }*/

            if (!user) {

                return res.status(403).send({message: 'System Error'})
            }

            req.logIn(user, err => {
                if (err) {

                    return res.status(403).send({message: err.message})
                }



            })
        })(req, res, next)
    })

    router.all('/auth/logout', function (req, res, next) {
        req.logout()
        res.send({})
    })

    return router
}
