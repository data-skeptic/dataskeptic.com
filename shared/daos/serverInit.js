import xml2js from 'xml2js'
import axios  from 'axios'

import {convert_items_to_json} from 'daos/episodes'
import {extractFolders} from '../utils/blog_utils'

const ADVERTISE_CARD_CONTENT = 'https://s3.amazonaws.com/dataskeptic.com/dassets/carousel/latest.htm';
const ADVERTISE_BANNER_CONTENT = 'https://s3.amazonaws.com/dataskeptic.com/dassets/banner/latest.htm';

function generate_content_map(env, blog, my_cache) {
    var pn = blog['prettyname']
    var envv = env + "."
    if (env === "prod") {
        envv = ""
    }
    var key = blog["rendered"]
    var pn = blog["prettyname"]
    var check = my_cache.content_map[pn];
    if (!check) {
        var uri = "https://s3.amazonaws.com/" + envv + 'dataskeptic.com/' + key
        return axios.get(uri)
            .then(function (result) {
                var content = result.data;
                my_cache.content_map[pn] = content;
                return content;
            })
            .catch((err) => {
                console.log("Content cache error trying to store blog content")
                console.log(err)
            })
    } else {
        return Promise.resolve(check);
    }
}

export function loadProducts(env) {
    const uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/products"
    return axios
        .get(uri)
        .then(function (result) {
            const items = result.data.Items;

            return items;
        })
        .catch((err) => {
            console.log("Could not load prodcuts")
        })

}

export function loadBlogs(env) {
    let data = {
        folders: [],
        content_map: {},
        blogmetadata_map: {},
        title_map: {}
    };

    let env2 = env;
    if (env === "prod") {
        env2 = "master"
    }

    let totalPosts = 0;

    var uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + env2
    return axios.get(uri)
        .then(function (result) {
            console.log('load blogs success')
            let blogs = result.data;
            let latest;
            const folders = extractFolders(blogs);
            data.folders = folders;

            let contentMapRequests = [];
            for (let i = 0; i < blogs.length; i++) {
                const blog = blogs[i];
                const pn = blog['prettyname'];
                // delete my_cache.blogmetadata_map[pn];
                data.blogmetadata_map[pn] = blog
                if (!latest) {
                    if (pn.indexOf("/episodes/") !== 0 && pn.indexOf("/transcripts/") !== 0) {
                        latest = blog;
                        data.blogmetadata_map["latest"] = latest
                    }
                }
                const title = blog['title'];
                data.title_map[pn] = title;

                contentMapRequests.push(generate_content_map(env, blog, data));
            }

            totalPosts = blogs.length;

            return Promise.all(contentMapRequests);
        })
        .then(() => {
            console.log("Loaded " + totalPosts + " blogs into content_map");
            return data;
        })
        .catch((err) => {
            console.log("loadBlogs error: " + err)
        })
}

export function loadEpisodes(env, feed_uri, blogmetadata_map, aws) {
    let data = {
        episodes_map: {},
        episodes_list: []
    };

    var domain = "dataskeptic.com";
    return axios.get(feed_uri)
        .then(function (result) {
            return new Promise((res, rej) => {
                var xml = result["data"];
                var parser = new xml2js.Parser();

                let latestGuid = '';

                parser.parseString(xml, function (err, rss) {
                    var items = rss["rss"]["channel"][0]["item"]
                    var episodes = convert_items_to_json(items)
                    var list = []
                    for (var i = 0; i < episodes.length; i++) {
                        var episode = episodes[i]
                        var link = episode['link']
                        var prettyname = link.replace("http://" + domain, "").replace("https://" + domain, '').replace('.php', '').replace('/blog/', '/')
                        var guid = episode.guid
                        data.episodes_map[guid] = episode
                        if (i == 0) {
                            data.episodes_map["latest"] = episode

                            var blogs = blogmetadata_map;
                            console.dir(prettyname);
                            var shownotes = blogs[prettyname]
                            if (shownotes == undefined) {
                                console.log("ERROR: Unlinkable episode: " + episode['guid'] + ' ' + episode['title'])
                                console.log(prettyname)
                            } else {
                                if (shownotes['guid'] == undefined) {
                                    console.log("Going to link " + episode['title'] + ' to ' + shownotes['prettyname'])
                                    latestGuid = guid;
                                    var docClient = new aws.DynamoDB.DocumentClient()
                                    var table = "blog"
                                    var pre = ""
                                    if (env != "prod" && env != "master") {
                                        pre = env + "."
                                    }
                                    var uri = shownotes['uri']
                                    var params = {
                                        TableName: table,
                                        Key: {
                                            "uri": uri
                                        },
                                        UpdateExpression: "set guid = :g",
                                        ExpressionAttributeValues: {
                                            ":g": guid
                                        },
                                        ReturnValues: "UPDATED_NEW"
                                    };
                                    docClient.update(params, function (err, data) {
                                        if (err) {
                                            rej(err);
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

                    for (var i = 0; i < list.length; i++) {
                        data.episodes_list.push(list[i])
                    }

                    console.log("Loaded " + episodes.length + " episodes into map")
                })

                res(data, latestGuid);
            })
        })
        .catch((err) => {
            console.log("loadEpisodes error: " + err);
            console.log(err)
        })
}

export function loadAdvertiseSourceContent(source) {
    return new Promise((res, rej) => {
        axios.get(source)
            .then(function (result) {
                if (result.status = 200) {
                    res(result.data);
                } else {
                    res(null);
                }
            })
            .catch((err) => {
                res(null);
            })
    })
}

export function loadAdvertiseContent() {
    return Promise.all([
        loadAdvertiseSourceContent(ADVERTISE_CARD_CONTENT),
        loadAdvertiseSourceContent(ADVERTISE_BANNER_CONTENT)
    ])
}