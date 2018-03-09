import axios from 'axios'

function serialize(obj) {
  var str = []
  for (var p in obj)
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
  return str.join('&')
}

export const joinSlack = (req, slack_key) => {
  var config = {}
  req['token'] = slack_key
  var sreq = serialize(req)
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://dataskeptic.slack.com/api/users.admin.invite?' + sreq,
        req,
        config
      )
      .then(resp => {
        var data = resp['data']
        var msg = ''
        if (data.ok) {
          msg =
            'Welcome to our Slack channel.  You should receive a confirmation email shortly!'
          var resp = { msg }
          return resolve(JSON.stringify(resp))
        } else {
          var error = data.error
          console.log(error)
          if (error === 'already_invited') {
            msg =
              'You have already been invited to our Slack channel.  Please check your spam folder or search your email to find the invite.'
          } else if (error === 'already_in_team') {
            msg =
              'You are already a member of the team.  Visit https://dataskeptic.slack.com/ to log in.'
          } else {
            msg =
              'An error has occured.  Please contact kyle@dataskeptic.com for assistance.'
          }
          var resp = { msg }
          return reject(JSON.stringify(resp))
        }
      })
      .catch(function(err) {
        console.log(err)
        var resp = {
          err,
          msg:
            'We could not process your request.  Please contact kyle@dataskeptic.com for assistance'
        }
        return reject(JSON.stringify(resp))
      })
  })
}
