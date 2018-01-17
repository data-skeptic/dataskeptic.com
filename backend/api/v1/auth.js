import express from 'express'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
let googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedinStrategy = require('../../modules/Auth/LinkedinStrategy').default
const UserServices = require('../../modules/Users/Services/UserServices');
let redirectURL;0

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const c = require('../../../config/config.json')

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

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser(async (id, done) =>
        done(null, id)
    )

    if (c[env]['linkedin']) {
        console.log("AUTH: allowing Linkedin Login")
        passport.use(LinkedinStrategy(global.env))
    }
    var gp = c[env]['googlePassport']
    if (gp) {
        console.log("AUTH: allowing Google Login")
            passport.use(new googleStrategy({
                clientID: gp.clientId,
                clientSecret: gp.clientSecret,
                callbackURL: '/api/v1/auth/google/callback',
                passReqToCallback:true
            },
            function (req, accessToken, refreshToken, profile, done){
                let user ={};
                user.id = profile.id;
                user.displayName = profile.displayName;
                user.google ={};
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.email = profile.emails[0].value;
                done(null, user);
            })
        )
    }


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
                            redirectURL = redirectURL.replace('/login', '');
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
        try {
            req.session.destroy();            
        }
        catch (err) {
            console.log(err)
        }
        res.redirect('/');
    })

    return router
}
