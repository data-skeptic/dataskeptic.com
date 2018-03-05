const ignoredKeys = ['latest', 'guid']
import filter from 'lodash/filter'
import moment from 'moment'
const NOT_FOUND_ERROR = {
  error: true,
  message: 'Not Found'
}
function isIgnoredKey(key) {
  return ignoredKeys.includes(key)
}
function matchingOffset(episode, index, offset) {
  return index >= offset
}

function matchingLimit(episode, index, limit) {
  return index < limit
}

function compare(dateTimeA, dateTimeB) {
  const momentA = moment(dateTimeA, 'YYYY-MM-DD')
  const momentB = moment(dateTimeB, 'YYYY-MM-DD')
  if (momentA > momentB) return 1
  else if (momentA < momentB) return -1
  else return 0
}
const isExist = (episodes_list, guid) => !!episodes_list[guid]
import Episode from '../models/Episode'

/*function isMatchingQuery(blog, {url = '', exclude = [], env}) {
    let match = false;
    if (!blog) return match;

    if (blog['prettyname'].indexOf(url) === 0) {
        match = true
    }

    if (url === '/') {
        for (let ex in exclude) {
            if (blog['prettyname'].indexOf(ex) === 0) {
                match = false
            }
        }
    }

    if (match) {
        match = blog.env === env;
    }

    return match;
}*/

export const getAll = (
  url,
  episodes_list,
  offset,
  limit,
  env,
  exclude = ['/episodes', '/transcripts']
) => {
  // remove unnecessary keys
  let episodes = filter(episodes_list, (episode, id) => !isIgnoredKey(id))
  // filter only relative episodes

  // episodes = filter(episodes, (episode, id) => isMatchingQuery(episode, {url, exclude, env}));

  // calculate total matched episodes count
  const total = episodes.length

  // slice over limits
  episodes = episodes
    .filter((episode, index) => matchingOffset(episode, index, offset))
    .filter((episode, index) => matchingLimit(episode, index, limit))

  // var latestId = "";
  // if (Object.keys(episodes_list).length > 0) {
  //     latestId = episodes_list['latest']['guid'];
  // }

  return new Promise((resolve, reject) => {
    resolve({
      env,
      episodes,
      total //,
      // latestId
    })
  })
}

export const getEpisode = (episode_map, guid) => {
  let episodeData
  if (isExist(episode_map, guid)) {
    const episode = episode_map[guid]

    episodeData = new Episode({
      title: episode['title'],
      desc: episode['desc'],

      pubDate: episode['pubDate'],

      mp3: episode['mp3'],
      duration: episode['duration'],

      img: episode['img'],

      guid: episode['guid'],
      link: episode['link'],
      num: episode['num']
    })
  }
  let data = episodeData ? episodeData : NOT_FOUND_ERROR
  return new Promise((resolve, reject) => {
    resolve({
      data
    })
  })
}
