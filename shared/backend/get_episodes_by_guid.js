import axios from 'axios'

module.exports = {
  get_episodes_by_guid: function(
    req,
    res,
    episodes_map,
    episodes_list,
    exclude = ['/episodes', '/transcripts']
  ) {
    var url = req.url
    var prefix = '/api/episodes/get/'
    var guid = url.substring(prefix.length, url.length)
    if (url.length < prefix.length) {
      return res.status(400).end('bad url')
    }
    url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/prod/podcast/episodes/get_by_guids"
    if (episodes_list == undefined || episodes_list.length == 0) {
      var request_body = {"guids": [guid]}
      axios.post(url, request_body).then(function(data) {
        var blogs = data.data
        if (blogs.length > 0) {
          var blog = blogs[0]
          return res.status(200).end(JSON.stringify(blog))
        } else {
          return res.status(404).end(JSON.stringify(blogs))
        }
      })
    } else {
      for (var ep of episodes_list) {
        if (ep == guid) {
          var episode = episodes_map[ep]
          return res.status(200).end(JSON.stringify(episode))
        }
      }
      console.log('oops!')
      var resp = { error: 'guid not found' }
      return res.status(404).end(JSON.stringify(resp))
    }
  }
}
