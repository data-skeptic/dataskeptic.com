const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin').Strategy;

module.exports = function() {

    passport.use(new LinkedInStrategy({
            consumerKey: "7867taol26djfu",
            consumerSecret: "fokazsFKEGM5HxoL",
            callbackURL: "http://localhost:3000/api/auth/linkedin/callback"
        }, function (accessToken, refreshToken, profile, done) {
            console.dir("here?");
            // asynchronous verification, for effect...
            User.findOrCreate({linkedinId: profile.id}, function (err, user) {
                return done(err, user);
            })
        }
    ));
}