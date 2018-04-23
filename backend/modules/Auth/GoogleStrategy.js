// DEPRECATED

let passport = require('passport')
let googleStrategy = require('passport-google-oauth').OAuth2Strategy
const env = process.env.NODE_ENV
const config = env === 'production' ? configJson.prod : configJson.dev

export default function(env) {
  passport.use(
    new googleStrategy(
      {
        clientID: `${config.googlePassport.clientId}`,
        clientSecret: `${config.googlePassport.clientSecret}`,
        callbackURL: '/api/v1/auth/google/callback',
        passReqToCallback: true
      },
      function(req, accessToken, refreshToken, profile, done) {
        let user = {}

        user.id = profile.id
        user.displayName = profile.displayName

        user.google = {}
        user.google.id = profile.id
        user.google.token = accessToken
        user.email = profile.emails[0].value

        done(null, user)
      }
    )
  )
}
