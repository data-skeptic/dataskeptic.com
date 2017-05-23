const ignoredKeys = ['latest', 'guid'];
import filter from 'lodash/filter';
import moment from 'moment';
function isIgnoredKey(key) {
    return ignoredKeys.includes(key);
}
function matchingOffset(episode, index, offset) {
    return (index >= offset);
}

function matchingLimit(episode, index, limit) {
    return (index < limit);
}

function compare(dateTimeA, dateTimeB) {
    const momentA = moment(dateTimeA, "YYYY-MM-DD");
    const momentB = moment(dateTimeB, "YYYY-MM-DD");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}
const isExist = (episodes_list, prettyName) => !!episodes_list[prettyName];
import Episode from "../models/Episode";

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

export const getAll = (url, episodes_list, offset, limit, env, exclude = ['/episodes', '/transcripts']) => {

    console.dir("episodes = " + episodes_list);
    // remove unnecessary keys
    let episodes = filter(episodes_list, (episode, id) => !isIgnoredKey(id));
    // filter only relative episodes
    console.dir("episodes2 = " + episodes);
   // episodes = filter(episodes, (episode, id) => isMatchingQuery(episode, {url, exclude, env}));
    console.dir("episodes3 = " + episodes);
    // calculate total matched episodes count
    const total = episodes.length;

    console.dir("episodes4 = " + episodes);
    // slice over limits
    episodes = episodes
        .filter((episode, index) => matchingOffset(episode, index, offset))
        .filter((episode, index) => matchingLimit(episode, index, limit));
    console.dir("episodes5 = " + episodes);
    // var latestId = "";
    // if (Object.keys(episodes_list).length > 0) {
    //     latestId = episodes_list['latest']['guid'];
    // }

        return new Promise((resolve, reject) => {
            resolve({
                env,
                episodes,
                total//,
               // latestId
            })
        })


};

export const getEpisode = () => {

};
