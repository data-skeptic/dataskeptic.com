module.exports = {
  get_episodes: function(req, res, episodes_map, episodes_list, exclude=['/episodes', '/transcripts']) {
  	var episodes = []
    var query = req.query
    var url = req.url
    var offset = parseInt(query['offset']) || 0
    var limit = parseInt(query['limit']) || 52 + 5 // We sometimes release more than once a week :)
    var year = query['year'] || -2
    var s = limit
    console.log(["eps", episodes_list.length])
    for (var i=offset; i < episodes_list.length && s > 0; i++) {
        var guid = episodes_list[i]
        var episode = episodes_map[guid]
        var pd = new Date(episode.pubDate)
        var eyear = pd.getYear()+1900
        if (year == -1) {
          year = eyear
        }
        if (year == -2 || eyear == year) {
          episodes.push(episode)
          s -= 1
        }
    }
  	return res.status(200).end(JSON.stringify(episodes))
  }
}