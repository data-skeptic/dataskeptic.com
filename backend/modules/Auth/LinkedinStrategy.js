import {Strategy as LinkedInStrategy} from 'passport-linkedin-oauth2'

export default function () {
    return new LinkedInStrategy(
        {
            clientID: '7867taol26djfu',
            clientSecret: '9PjTFcqOEvCuLlQK',
            callbackURL: "http://localhost:3000/auth/linkedin/callback",
            scope: ['r_emailaddress', 'r_basicprofile'],
            state: true
        },
        (accessToken, refreshToken, {_json: {id}}, done) => {
            try {
                // fetch user data
                const user = {}

                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    )
}
