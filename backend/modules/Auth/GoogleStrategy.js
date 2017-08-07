let passport = require('passport');
let googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../../config/config.json')

module.exports = function() {
  passport.use(new googleStrategy({
    clientID: `${config.dev.googlePassport.clientId}`,
    clientSecret: `${config.dev.googlePassport.clientSecret}`,
    callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
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

    }
  ))
};

