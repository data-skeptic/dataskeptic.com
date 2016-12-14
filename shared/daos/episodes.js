import axios from "axios"
import xml2js from "xml2js"

export var feed_uri = "http://dataskeptic.libsyn.com/rss"

export function convert_items_to_json(items) {
	var episodes = []
	items.map(function(item) {
		var mp3 = item["enclosure"][0]["$"]["url"]
		var dstr = item["pubDate"][0]
		var pubDate = new Date(dstr)
		var episode = {
			"title": item["title"][0],
			"desc": item["description"][0],
			"pubDate": pubDate,
			"mp3": mp3,
			"duration": item["itunes:duration"][0],
			"img": item["itunes:image"][0]["$"]["href"],
			"guid": item["guid"][0]["_"],
			"link": item["link"][0]
		}
		episodes.push(episode)
	})
	return episodes
}

export default function getEpisodes(store) {
	console.log("Network: retrieving episodes")
	axios
	  .get(feed_uri)
	  .then(function(result) {
	  	var xml = result["data"]
		var parser = new xml2js.Parser()
		var year = (new Date()).getYear()+1900

		parser.parseString(xml, function(err,rss) {
			var items = rss["rss"]["channel"][0]["item"]
			var episodes = convert_items_to_json(items)
			if (episodes.length > 0) {
				var pubDate = episodes[0].pubDate
				year = pubDate.getYear() + 1900				
			}
			store.dispatch({type: "ADD_EPISODES", payload: episodes })
			store.dispatch({type: "SET_YEAR", payload: year })
			store.dispatch({type: "SET_EPISODES_LOADED", payload: 1 })
			console.log("loaded episodes")	
		})
	})
	.catch((err) => {
		store.dispatch({type: "FETCH_EPISODES_ERROR", playload: err})
	})			
}