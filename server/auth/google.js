import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

//TODO: move to the config
const clientID = '285762740616-7o6qg86dfd5t3b0l92gtjlmf101qt840.apps.googleusercontent.com'
const clientSecret =  'SxyR6JNlC28scRCTnzd4xnoq'
const callbackUrl = '/api/v1/auth/google/callback'

const admins = [
    'kyle@dataskeptic.com',
    'gleb@thespoon.co'
]

const config = {
    clientID,
    clientSecret,
    callbackURL: '/api/v1/auth/google/callback',
    passReqToCallback: true
}

const isUserAdmin = (user) => {
    const email = user.emails[0].value
    return admins.indexOf(email) > -1
}

const initialize = (props) => {
    passport.use(
        new GoogleStrategy(config, async function callback(
            request, accessToken, refreshToken, profile, done
        ) {
            const user = {
                ...profile,
                admin: isUserAdmin(profile)
            }

            if (user) {
                // update admin
                console.info(
                    'Successful login by %s %s.',
                    profile.name.givenName,
                    profile.name.familyName
                )

                done(null, user)
            } else {
                // can't find you in the admins table, sorry
                console.warn(
                    'Unsuccessful login attempt from %s',
                    JSON.stringify(user, null, 2)
                )
                done(null, false)
            }

        })
    )

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser(async (id, done) =>
        done(null, id)
    )
}

export default initialize
