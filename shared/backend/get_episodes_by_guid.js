module.exports = {
  get_episodes_by_guid: function(req, res, episodes_map, episodes_list, exclude=['/episodes', '/transcripts']) {
  	var url = req.url
  	var prefix = '/api/episodes/get/'
    var guid = url.substring(prefix.length, url.length)
  	if (url.length < prefix.length) {
  		return res.status(400).end("bad url")
  	}
    for (var ep of episodes_list) {
      if (ep == guid) {
        var episode = episodes_map[ep]
        return res.status(200).end(JSON.stringify(episode))
      }
    }
		var resp = {"error": "guid not found"}
		return res.status(404).end(JSON.stringify(resp))
  }
}