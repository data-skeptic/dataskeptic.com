import {Strategy as LinkedInStrategy} from 'passport-linkedin-oauth2'
const config = require('../../../config.json');

export default function ({env}) {
    return new LinkedInStrategy(
        config[env].linkedin,
        function (accessToken, refreshToken, {_json: {id, emailAddress, firstName, formattedName}}, done) {
            try {
                // fetch user data
                const user = {
                    linkedinId: id,
                    firstName: firstName,
                    fullName: formattedName,
                    email: emailAddress
                }

                return done(null, user)
            } catch (error) {

                return done(error, null)
            }
        }
    )
}
