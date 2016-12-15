import xml2js from 'xml2js'
import axios  from 'axios'
import { convert_items_to_json } from 'daos/episodes'

function generate_content_map(env, blog, content_map) {
  var pn = blog['prettyname']
  var envv = env + "."
  if (env == "prod") {
    envv = ""
  }
  var key = blog["rendered"]
  var pn = blog["prettyname"]
  var uri = "https://s3.amazonaws.com/" + envv + 'dataskeptic.com/' + key
  axios.get(uri).then(function(result) {
    var content = result.data
    content_map[pn] = content
  })
  .catch((err) => {
    console.log("Content cache error trying to store blog content")
    console.log(err)
  })
}

export function loadBlogs(env, blogmetadata_map, title_map, content_map) {
  var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + env
  axios
  .get(uri)
  .then(function(result) {
    var blogs = result.data
    for (var i=0; i < blogs.length; i++) {
      var blog = blogs[i]
      var pn = blog['prettyname']
      blogmetadata_map[pn] = blog
      if (i == 0) {
        blogmetadata_map["latest"] = blog
      }
      var title = blog['title']
      title_map[pn] = title
      generate_content_map(env, blog, content_map)
    }
    console.log("Loaded all blogs into content_map")
  })
  .catch((err) => {
    console.log("loadBlogs error: " + err)
  })
}

export function loadEpisodes(env, feed_uri, episodes_map) {
  axios
    .get(feed_uri)
    .then(function(result) {
      var xml = result["data"]
      var parser = new xml2js.Parser()

      parser.parseString(xml, function(err,rss) {
        var items = rss["rss"]["channel"][0]["item"]
        var episodes = convert_items_to_json(items)
        for (var i=0; i < episodes.length; i++) {
          var episode = episodes[i]
          episodes_map[episode.guid] = episode
          if (i == 0) {
            episodes_map["latest"] = episode
          }
        }
        console.log("Loaded all episodes into map")
    })
  })
  .catch((err) => {
    console.log("loadEpisodes error: " + err)
    console.log(err)
  })
}

