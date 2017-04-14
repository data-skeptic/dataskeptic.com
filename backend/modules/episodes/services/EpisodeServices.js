import axios from "axios"
import xml2js from "xml2js"

import EpisodeModel from '../models/Episode';

const ENV = global.env;
const DB_ENV = (ENV === 'prod' ? 'master' : ENV);
const feedUrl = "http://dataskeptic.libsyn.com/rss";

const xmlToEpisodesJS = (items) => {
    let num = items.length;

    return items.map((item) => {
        const mp3 = item["enclosure"][0]["$"]["url"];
        const dstr = item["pubDate"][0];
        const pubDate = new Date(dstr);
        const episode = EpisodeModel({
            title: item["title"][0],
            desc: item["description"][0],
            pubDate: pubDate,
            mp3: mp3,
            duration: item["itunes:duration"][0],
            img: item["itunes:image"][0]["$"]["href"],
            guid: item["guid"][0]["_"],
            link: item["link"][0],
            num: num
        });

        num -= 1;

        return episode;
    })
};

export const getAll = () => {
    return axios.get(feedUrl)
        .then((result) => {
            return new Promise((res, rej) => {
                const xml = result["data"];
                const parser = new xml2js.Parser();
                let year = (new Date()).getYear()+1900;

                parser.parseString(xml, (err, rss) => {
                    if (err) {
                        rej(err);
                    }

                    const items = rss["rss"]["channel"][0]["item"];
                    const episodes = xmlToEpisodesJS(items);
                    if (episodes.length > 0) {
                        const pubDate = episodes[0].pubDate;
                        year = pubDate.getYear() + 1900
                    }

                    return res(episodes.concat(10));
                })
            });
        })
        .catch((err) => {
            console.error(err);
        })
};