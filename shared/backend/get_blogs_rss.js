const RSS = require('rss');
var axios = require('axios');
var fs = require('fs');
const map = require('lodash/map');
const each = require('lodash/each');
const filter= require('lodash/filter');

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../config/config.json')

const BASE_URL = 'https://dataskeptic.com/';
var api_url = c[env]['base_api'] + env

const BlogItemModel = ({ title, publish_date, prettyname, desc, author, guid }) => (
    {
        title: title,
        description: desc,
        url: BASE_URL + 'blog' + prettyname,
        guid: guid,
        author: author,
        categories: '',
        date: Date.parse(publish_date)
    }
);


module.exports = {
    get_blogs_rss: function (req, res) {
        // TODO: setup caching here instead
        var url = api_url + "/blog/all"
        axios.get(url).then(function(data) {
            var blogs = data.data
            let feed = new RSS({
                title: 'Data Skeptic',
                description: 'Data Skeptic is your source for a perspective of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science. Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.',
                feed_url: `${BASE_URL}/api/blog/rss`,
                site_url: BASE_URL,
                managingEditor: 'Kyle',
                language: 'en'
            });

            each(blogs, (blog) => {
                if (!blog) return;
                feed.item(BlogItemModel(blog));
            });

            const xml = feed.xml();

            return res.status(200).end(xml)

        })
    }
}
