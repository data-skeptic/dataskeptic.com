import {Strategy as LinkedInStrategy} from 'passport-linkedin-oauth2'
const  config = require('../../../config.json');

export default function () {
    return new LinkedInStrategy(
        {
            clientID: `${config.dev.linkedin.clientID}`,
            clientSecret: `${config.dev.linkedin.clientSecret}`,
            callbackURL: `${config.dev.linkedin.callbackURL}`,
            scope: `${config.dev.linkedin.scope}`,
            state: `${config.dev.linkedin.state}`
        },
        function (accessToken, refreshToken, {_json: {id}}, done) {
            console.dir({
                accessToken,
                refreshToken
            })

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
