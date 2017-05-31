const express = require('express');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const LinkedinStrategy = require('../../modules/Auth/LinkedinStrategy').default
const UserServices = require('../../modules/Users/Services/UserServices');

module.exports = (env) => {
    const router = express.Router();
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        const user = {
            id
        }

        done(user)
    })
    console.dir("ENV 2 = " + env)
    passport.use(LinkedinStrategy(env))
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

    // LINKEDIN
    router.all('/login/linkedin', passport.authenticate('linkedin'))
    router.all('/linkedin/activate', function (req, res){
        UserServices
            .changeActiveStatus(req.body)
            .then(status =>{
                res.redirect('/');
            })
    });
    router.get('/linkedin/callback', function (req, res, next) {
        console.dir('linkedin callback')
        passport.authenticate('linkedin', {
            failWithError: true,
            failureFlash: true
        }, function (err, user, info) {
            return res.send(user);
            /*  if (err) {
             console.dir("check 1 ");
             return res.status(403).send({message: err})
             }*/

            if (!user) {
                console.dir("check 2 ");
                return res.status(403).send({message: 'System Error'})
            }

            req.logIn(user, err => {
                if (err) {
                    console.dir("check 3 ");
                    return res.status(403).send({message: err.message})
                }
                console.dir("check 4 ");


            })
        })(req, res, next)
    })

    router.all('/logout', function (req, res, next) {
        req.logout()
        res.send({})
    })
    return router;
}