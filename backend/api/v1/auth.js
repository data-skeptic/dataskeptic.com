import express from 'express'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const LinkedinStrategy = require('../../modules/Auth/LinkedinStrategy').default
const GoogleStrategy = require('../../modules/Auth/GoogleStrategy')();
const UserServices = require('../../modules/Users/Services/UserServices');
let redirectURL;
module.exports = () => {
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
    //passport.use(GoogleStrategy({env}))
    passport.use(LinkedinStrategy(global.env))
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
    router.post('/login', (req, res, next) => {
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
    // GOOGLE
    router.all('/login/google', (req, res, next) => {
        redirectURL = req.headers.referer;
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email']
        })(req, res, next)
    });
    // LINKEDIN
    router.all('/login/linkedin', passport.authenticate('linkedin'))
    router.all('/linkedin/activate', function (req, res) {
        UserServices
            .changeActiveStatus(req.body)
            .then(status => {
                res.redirect('/');
            })
    });

    router.get('/google/callback', (req, res, next) => {
        passport.authenticate('google', {failWithError: true}, function (err, user, info) {
            if (err) {
                return res.status(403).send({message: err.message})
            }
            if (!user) {
                return res.status(403).send({message: 'System Error'})
            }
            req.logIn(user, err => {
                if (err) {
                    return res.send({
                        success: false,
                        message: err
                    })
                } else {
                    console.dir(redirectURL)
                    redirectURL = redirectURL + '/auth?user=' + JSON.stringify(user);
                    return res.redirect(redirectURL)
                }

            })
        })(req, res, next);
    })

router.get('/linkedin/callback', function (req, res, next) {

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
            } else {
                redirectURL = redirectURL + 'token?user=' + JSON.stringify(user)
                return res.redirect(redirectURL)
            }


        })
    })(req, res, next)
})

router.all('/logout', function (req, res, next) {
    req.logout()
    res.send({})
})

return router
}
