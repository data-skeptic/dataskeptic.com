module.exports = {
  get_episodes_by_guid: function(req, res, episodes_map, episodes_list, exclude=['/episodes', '/transcripts']) {
  	var url = req.url
  	var prefix = '/api/episodes/get/'
  	if (url.length < prefix.length) {
  		return res.status(400).end("bad url")
  	}
  	var guid = url.substring(prefix.length, url.length)
  	var episode = episodes_map[guid]
  	if (episode == undefined) {
  		var resp = {"error": "guid not found"}
  		return res.status(404).end(JSON.stringify(resp))
  	}
  	return res.status(200).end(JSON.stringify(episode))
  }
}