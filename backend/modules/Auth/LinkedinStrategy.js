import {Strategy as LinkedInStrategy} from 'passport-linkedin-oauth2'
const config = require('../../../config.json');
const UserServices = require('../Users/Services/UserServices')

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
                };
                process.nextTick(function () {
                    console.dir("here");
                    UserServices
                        .insertIntoDatabase(user)
                        .then(id =>{
                            UserServices
                                .getUserById(id)
                                .then(data =>{
                                    console.dir("new");
                                    return done(null, data);
                                })

                        });

                    console.dir("here3");

                });


            } catch (error) {

                return done(error, null)
            }
        }
    )
}
