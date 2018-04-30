import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
const UserServices = require('../Users/Services/UserServices')

export default function(env) {
  return new LinkedInStrategy(config[env].linkedin, function() {
    try {
      // fetch user data
      const user = {
        linkedinId: id,
        firstName: firstName,
        fullName: formattedName,
        email: emailAddress
      }

      console.dir({ id, emailAddress, firstName, formattedName })
      process.nextTick(function() {
        UserServices.getUserByLinkedinId(id).then(row => {
          if (row === undefined) {
            UserServices.insertIntoDatabase(user).then(id => {
              UserServices.getUserById(id).then(data => {
                return done(null, data)
              })
            })
          } else {
            return done(null, row)
          }
        })
      })
    } catch (error) {
      return done(error, null)
    }
  })
}
