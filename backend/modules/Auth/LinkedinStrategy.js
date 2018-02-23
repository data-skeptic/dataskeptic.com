import {Strategy as LinkedInStrategy} from 'passport-linkedin-oauth2'
const UserServices = require('../Users/Services/UserServices');

const config = {
	clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: JSON.parse(process.env.LINKEDIN_SCOPE),
  state: JSON.parse(process.env.LINKEDIN_STATE)
}

export default function (env) {
    return new LinkedInStrategy(
        config,
        function (accessToken, refreshToken, {_json: {id, emailAddress, firstName, formattedName}}, done) {
            try {

                // fetch user data
                const user = {
                    linkedinId: id,
                    firstName: firstName,
                    fullName: formattedName,
                    email: emailAddress
                };
                process.nextTick(function () {
                    UserServices
                        .getUserByLinkedinId(id)
                        .then(row => {
                            if (row===undefined){
                                UserServices
                                    .insertIntoDatabase(user)
                                    .then(id =>{
                                        UserServices
                                            .getUserById(id)
                                            .then(data =>{
                                                return done(null, data);
                                            })

                                    });
                            } else {
                                return done(null, row);
                            }

                        })


                });


            } catch (error) {

                return done(error, null)
            }
        }
    )
}
