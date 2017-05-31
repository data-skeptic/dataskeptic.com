import {Strategy as LinkedInStrategy} from 'passport-linkedin-oauth2'
const config = require('../../../../config.json');
const UserServices = require('../../Users/Services/UserServices');

export default function (env) {
    console.dir("strategy env = " + env)
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
                    UserServices
                        .getUserByLinkedinId(id)
                        .then(row => {
                            if (row.Count === 0){
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
