import axios from 'axios'
import xml2js from 'xml2js'

export var feed_uri = 'http://dataskeptic.libsyn.com/rss'

export function convert_items_to_json(items) {
  var episodes = []
  var num = items.length
  items.map(function(item) {
    var mp3 = item['enclosure'][0]['$']['url']
    var dstr = item['pubDate'][0]
    var pubDate = new Date(dstr)
    var episode = {
      title: item['title'][0],
      desc: item['description'][0],
      pubDate: pubDate,
      mp3: mp3,
      duration: item['itunes:duration'][0],
      img: item['itunes:image'][0]['$']['href'],
      guid: item['guid'][0]['_'],
      link: item['link'][0],
      num: num
    }
    num -= 1
    episodes.push(episode)
  })
  return episodes
}
