import xml2js from 'xml2js'
import axios from 'axios'
import contributors from './contributors'

const FEED_URL = `http://dataskeptic.libsyn.com/rss`

const ADVERTISE_CARD_CONTENT = 'https://s3.amazonaws.com/dataskeptic.com/dassets/carousel/latest.htm'
const ADVERTISE_BANNER_CONTENT = 'https://s3.amazonaws.com/dataskeptic.com/dassets/banner/latest.htm'

const domain = "dataskeptic.com"
const formatLink = (link) => link.replace("http://" + domain, "").replace("https://" + domain, '').replace('.php', '').replace('/blog/', '/').replace('/episodes/', '')

const convertEpidodes = (items) => {
    let episodes = []
    let num = items.length
    items.map(function(item) {
        const mp3 = item["enclosure"][0]["$"]["url"]
        const dstr = item["pubDate"][0]
        const pubDate = new Date(dstr)
        const episode = {
            "title": item["title"][0],
            "desc": item["description"][0],
            "pubDate": pubDate,
            "mp3": mp3,
            "duration": item["itunes:duration"][0],
            "img": item["itunes:image"][0]["$"]["href"],
            "guid": item["guid"][0]["_"],
            "link": item["link"][0],
            "num": num
        }
        num -= 1
        episodes.push(episode)
    })
    return episodes
}


const extractCategories = (blogs) => {
    return blogs.map((blog) => {
        const arr = blog.prettyname.split("/")
        const level = 0
        if (arr.length >= level+2) {
            return arr[level+1]
        }
    })
    .filter((v) => !!v)
    .reduce((a, x) => a.includes(x) ? a : [...a, x], [])
    .sort()
}


const getAuthor = (author) => {
    return contributors[author]
}

const getBlogContent = (env, key) => {
    let envv = env + "."
    if (env === "prod") {
        envv = ""
    }

    const fetchUrl = "https://s3.amazonaws.com/" + envv + 'dataskeptic.com/' + key
    return axios.get(fetchUrl).then(res => res.data)
        .catch((err) => console.error(`Error fetching ${key} content`))
}

const loadBlogsContent = (env, blogs) => {
    return Promise.all(blogs.map((blog) => {
        return getBlogContent(env, blog.rendered)
            .then((content) => {
                const author = blog.author.toLowerCase()
                return {
                    ...blog,
                    content,
                    author: getAuthor(author)
                }
            })
    }))
}

const getBlogs = (env) => {
    let env2 = "master";
    if (env === "prod") {
        env2 = "master"
    }

    const fetchUrl = `https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/${env}/blogs?env=${env2}`
    return axios.get(fetchUrl)
        .then((res) => {
            const blogs = loadBlogsContent(env, res.data)

            return blogs
        })
}

const getEpisodes = () => {
    return axios
        .get(FEED_URL)
        .then((result) => {
            const xml = result["data"]
            const parser = new xml2js.Parser()
            let year = (new Date()).getYear()+1900

            return new Promise((res, rej) => {
                parser.parseString(xml, (err,rss) => {
                    if (err) {
                        rej(err)
                    }

                    const items = rss["rss"]["channel"][0]["item"]
                    const episodes = convertEpidodes(items)
                    if (episodes.length > 0) {
                        const pubDate = episodes[0].pubDate
                        year = pubDate.getYear() + 1900
                    }
                    res(episodes)
                })
            })
        })
        .then((episodes) => episodes.map((episode) => ({
            ...episode,
            link: formatLink(episode.link)
        })))
}


const loadAdvertiseSourceContent = (source) => {
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

const formatByKey = (items, key) => {
    let formattedItems = {}

    items.forEach((item, index) => {
        const value = item[key]
        item.order = index+1
        formattedItems[value] = item
    })

    return formattedItems
}

const exclude = items =>
    items.filter((item) => {
        return !(item.prettyname.indexOf('/episodes') === 0 ||
                 item.prettyname.indexOf('/transcripts') === 0)
    })

const init = async (isProduction) => {
    const env = isProduction ? 'prod' : 'dev'

    const [blogs, episodes, card, sponsor] = await Promise.all([
        getBlogs(env),
        getEpisodes(),
        loadAdvertiseSourceContent(ADVERTISE_CARD_CONTENT),
        loadAdvertiseSourceContent(ADVERTISE_BANNER_CONTENT)
    ])

    const latestEpisode = episodes[0]
    const latestPost = blogs[0]

    const categories = extractCategories(blogs)

    const cache = {
        blogs: formatByKey(blogs, `prettyname`),
        posts: exclude(blogs),
        episodes: formatByKey(episodes, `guid`),
        latestEpisode,
        latestPost,
        categories,
        card,
        sponsor
    }

    return cache
}

export default init

