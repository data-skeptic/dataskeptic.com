const RSS = require('rss');

const map = require('lodash/map');
const each = require('lodash/each');
const filter= require('lodash/filter');

const BASE_URL = 'https://dataskeptic.com/';

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
    get_blogs_rss: function (req, res, blogmetadata_map, exclude = ['/episodes', '/transcripts']) {
        let blogs = blogmetadata_map;

        blogs = filter(blogmetadata_map, (blog) => !!blog);

        blogs = map(blogs, (post) => {
            return post;
        });

        let feed = new RSS({
            title: 'Data Skeptic',
            description: 'Data Skeptic is your source for a perseptive of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science. Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.',
            feed_url: `${BASE_URL}/api/blog/rss`,
            site_url: BASE_URL,
            managingEditor: 'Kyle',
            language: 'en'
        });

        each(blogs, (blog) => {
            if (blog.env === 'master') { // don't share dev on master
                feed.item(BlogItemModel(blog));
            }
        });

        const xml = feed.xml();

        return res.status(200).end(xml)
    }
}