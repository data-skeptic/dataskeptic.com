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
    console.log('get_episodes_by_guid')
    console.log(url)
    var guid = url.substring(prefix.length, url.length)
    console.log(guid)
    if (url.length < prefix.length) {
      return res.status(400).end('bad url')
    }
    console.log(episodes_list.length)
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
