import express from 'express'
import axios   from 'axios'
import sha1 from 'sha1'
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
let googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedinStrategy = require('../../modules/Auth/LinkedinStrategy').default
const UserServices = require('../../modules/Users/Services/UserServices');
const MailServices = require('../../modules/mail/services/MailServices');

let redirectURL;

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const c = require('../../../config/config.json')
const salt = c[env]['auth']['salt']
const base_url = c[env]['base_api'] + env

const checkIfAdmin = (email) => {
    const email_reg_exp = /^.*@dataskeptic\.com/i;
    return email_reg_exp.test(email);
};

const checkRoute = (route) => {
    const admin_rexp = new RegExp('.*\/admin\/login')
    return admin_rexp.test(route)
}

const ALREADY_EXIST_MSG = `User already exist`
const INCORRECT_PASSWORD_MSG = `Incorrect login id or password`

const saltPassword = (password) => sha1(password+salt)
const verifyPassword = (up, rp) => saltPassword(up) === rp

const getUserAccount = (email) => axios.get(`${base_url}/user/get?email=${email}`).then((res) => res.data.length > 0 && res.data[0])
const createUserAccount = (data) => axios.post(`${base_url}/user/add`, data).then((res) => res.data)

const notifyOnJoin = ({ email }) => {
    console.info(`New user ${email} joined the site.`)

    const message = {
        msg: `Thanks for creating an account on dataskeptic.com. If you have any problems or questions, please reach out to kyle@dataskeptic.com`,
        subject: `dataskeptic.com account created`,
        to: email
    }

    return MailServices.sendMail(message)
}


const joinList = (list, key) =>
    list.reduce(function(a, curr) {
        return [...a, curr[key]];
    }, []);

const getUserList = (email, list, props = '') => axios.get(`${base_url}/user/${list}/list?email=${email}${props}`).then((res) => joinList(res.data, 'blog_id'))

const getPlayedList = (email) => getUserList(email, 'played', '&limit=1000&offset=0')
const getPlaylistList = (email) => getUserList(email, 'playlist')
const getFavoritesList = (email) => getUserList(email, 'favorites')

const getUserData = async (email) => {
    const [ played, playlist, favorites ] = await Promise.all([
        getPlayedList(email),
        getPlaylistList(email),
        getFavoritesList(email)
    ])

    const lists = { played, playlist, favorites }

    return {
        lists
    }
}

export const SCHEMA_VER = 1

module.exports = () => {
    const router = express.Router()

    passport.serializeUser(async (user, done) => {
        delete user.password

        if (!user.firstInit) {
	        console.log(`get user data?`)
	        const data = await getUserData(user.email)
	        user = {
		        ...user,
		        ...data,
		        operations: [],
            firstInit: true,
		        schema: SCHEMA_VER,
		        type: checkIfAdmin(user.email) ? 'admin' : 'user',
            hasAccess: true
	        }
        }

        done(null, user)
    })

    passport.deserializeUser(async (id, done) => {
        done(null, id)
    })

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
            }, async (email, password, done) => {
                const user = await getUserAccount(email)

                if (!user) {
                    return done(Error('User not found'), null)
                } else {
                    if (!verifyPassword(password, user.password)) {
                        return done(Error(INCORRECT_PASSWORD_MSG), null)
                    }

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
                return res.send({success: false, message: err.message})
            }

            if (!user) {
                return res.send({success: false, message: 'System Error'})
            }

            req.logIn(user, err => {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: err
                    })
                } else {
                    return res.send({ user, success: true })
                }
            })
        })(req, res, next)
    })

    router.post('/signup', async (req, res, next) => {
        const {email, password} = req.body

        const existUser = await getUserAccount(email)
        if (existUser) {
            return res.send({
                success: false,
                message: ALREADY_EXIST_MSG
            })
        }

        const user = {
            email,
            password: saltPassword(password)
        }

        await createUserAccount(user)
        notifyOnJoin(user)

        req.logIn(user, function(err) {
            if (err) { return next(err); }

            return res.send({ success: true })
        });
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
        passport.authenticate('google', {failWithError: true}, async (err, user, info) => {
            if (err) {
                return res.status(403).send({message: err.message})
            }
            if (!user) {
                return res.status(403).send({message: 'System Error'})
            }

            const userAccount = await getUserAccount(user.email)
            if (!userAccount) {
                const userData = {
                  email: user.email
                }

	              await createUserAccount(userData)
	              notifyOnJoin(user)
            }

            req.logIn(user, err => {
                if (err) {
                    return res.send({
                        success: false,
                        message: err
                    })
                } else {
                    if(checkRoute(redirectURL)){
                        if(checkIfAdmin(user.email)) {
                            redirectURL = redirectURL.replace('/login', '');
                        }
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
        req.session = null;
        res.redirect('/');
    })

    return router
}
