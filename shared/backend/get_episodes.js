module.exports = {
  get_episodes: function(req, res, episodes_map, exclude=['/episodes', '/transcripts']) {
  	var episodes = []
    var query = req.query
    var url = req.url
    var offset = query['offset'] || 0
    var limit = query['limit'] || 10
    var year = query['year'] || -1
    var guids = Object.keys(episodes_map)
    for (var i=0; i < guids.length; i++) {
        var guid = guids[i]
        var episode = episodes_map[guid]
    }
	return res.status(200).end(JSON.stringify(episodes))
  }
}