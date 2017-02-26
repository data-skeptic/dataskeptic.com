import xml2js from 'xml2js'
import axios  from 'axios'

import { convert_items_to_json } from 'daos/episodes'
import { extractFolders } from '../utils/blog_utils'

function generate_content_map(env, blog, my_cache) {
  var pn = blog['prettyname']
  var envv = env + "."
  if (env == "prod") {
    envv = ""
  }
  var key = blog["rendered"]
  var pn = blog["prettyname"]
  var check = my_cache.content_map[pn]
  if (check == undefined) {
    var uri = "https://s3.amazonaws.com/" + envv + 'dataskeptic.com/' + key
    console.log("Getting " + uri)
    axios.get(uri).then(function(result) {
      var content = result.data
      my_cache.content_map[pn] = content
    })
    .catch((err) => {
      console.log("Content cache error trying to store blog content")
      console.log(err)
    })    
  }
}

export function loadProducts(env, my_cache) {
  var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/products"
  axios
    .get(uri)
    .then(function(result) {
      var items = result.data.Items
      my_cache.products['items'] = items
    })
    .catch((err) => {
      console.log("Could not load prodcuts")
    })      

}
export function loadBlogs(store, env, my_cache) {
  var env2 = env
  if (env == "prod") {
    env2 = "master"
  }
  var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + env2
  axios
  .get(uri)
  .then(function(result) {
    var blogs = result.data
    var latest = undefined
    var folders = extractFolders(blogs)
    my_cache.folders = folders
    store.dispatch({type: "ADD_FOLDERS", payload: folders })
    store.dispatch({type: "ADD_BLOGS", payload: {blogs} })
    for (var i=0; i < blogs.length; i++) {
      var blog = blogs[i]
      var pn = blog['prettyname']
      my_cache.blogmetadata_map[pn] = blog
      if (latest == undefined) {
        if (pn.indexOf("/episodes/") != 0 && pn.indexOf("/transcripts/") != 0) {
          latest = blog
          console.log("latest")
          console.log(pn)
          my_cache.blogmetadata_map["latest"] = latest
        }
      }
      var title = blog['title']
      my_cache.title_map[pn] = title
      generate_content_map(env, blog, my_cache)
    }
    console.log("Loaded " + blogs.length + " blogs into content_map")
  })
  .catch((err) => {
    console.log("loadBlogs error: " + err)
  })
}

export function loadEpisodes(env, feed_uri, my_cache, aws) {
  var domain = "dataskeptic.com"
  axios
    .get(feed_uri)
    .then(function(result) {
      var xml = result["data"]
      var parser = new xml2js.Parser()

      parser.parseString(xml, function(err,rss) {
        var items = rss["rss"]["channel"][0]["item"]
        var episodes = convert_items_to_json(items)
        var list = []
        for (var i=0; i < episodes.length; i++) {
          var episode = episodes[i]
          var link = episode['link']
          var prettyname = link.replace("http://" + domain, "").replace("https://" + domain, '').replace('.php', '').replace('/blog/', '/')
          var guid = episode.guid
          my_cache.episodes_map[guid] = episode
          if (i == 0) {
            console.log("i==0")
            my_cache.episodes_map["latest"] = episode
            var blogs = my_cache.blogmetadata_map
            var shownotes = blogs[prettyname]
            if (shownotes == undefined) {
              console.log("ERROR: Unlinkable episode: " + episode['guid'] + ' ' + episode['title'])
              console.log(prettyname)
            } else {
              if (shownotes['guid'] == undefined) {
                console.log("Going to link " + episode['title'] + ' to ' + shownotes['prettyname'])
                my_cache.blogmetadata_map['guid'] = guid
                var docClient = new aws.DynamoDB.DocumentClient()
                var table = "blog"
                var pre = ""
                if (env != "prod" && env != "master") {
                  pre = env + "."
                }
                var uri = shownotes['uri']
                var params = {
                    TableName:table,
                    Key:{
                        "uri": uri
                    },
                    UpdateExpression: "set guid = :g",
                    ExpressionAttributeValues:{
                        ":g": guid
                    },
                    ReturnValues:"UPDATED_NEW"
                };
                docClient.update(params, function(err, data) {
                    if (err) {
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                    }
                });
              }
            }
          }
          list.push(episode.guid)
        }
        my_cache.episodes_list.splice(0, my_cache.episodes_list.length)
        for (var i=0; i < list.length; i++) {
          my_cache.episodes_list.push(list[i])
        }
        console.log("Loaded " + episodes.length + " episodes into map")
    })
  })
  .catch((err) => {
    console.log("loadEpisodes error: " + err)
    console.log(err)
  })
}

