import express from 'express'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const LinkedinStrategy = require('../../modules/Auth/LinkedinStrategy').default
const GoogleStrategy = require('../../modules/Auth/GoogleStrategy')();
const UserServices = require('../../modules/Users/Services/UserServices');
let redirectURL;

const checkIfAdmin = (email) => {
    const email_reg_exp = /^.*@dataskeptic\.com/i;
    return email_reg_exp.test(email);
};

const checkRoute = (route) => {
    const admin_rexp = new RegExp('.*\/admin\/login')
    return admin_rexp.test(route)
}

module.exports = () => {
    const router = express.Router()

    passport.serializeUser(function (user, done) {
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {

        done(null, user)
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

    router.get('/usertest', (req, res) => {
        res.send(req.user);
    });

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
                    user.type = checkIfAdmin(user.email) ? 'admin' : 'user';
                    user.hasAccess = true
                    if(checkRoute(redirectURL)){
                        if(checkIfAdmin(user.email)) {
                           // redirectURL = redirectURL + '/handler?user=' + JSON.stringify(user);
                        }
                    }
                    else{
                        //redirectURL = redirectURL + '/auth?user=' + JSON.stringify(user);
                    }
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
        req.logout();
        req.session.destroy();
        res.redirect('/logout');
    })

    return router
}
