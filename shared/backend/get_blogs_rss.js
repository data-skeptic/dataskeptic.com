const RSS = require('rss');

const map = require('lodash/map');
const each = require('lodash/each');
const filter= require('lodash/filter');

const BlogItemModel = ({ title, publish_date, prettyname, desc, author, guid }) => (
    {
        title: title,
        description: desc,
        url: prettyname,
        guid: guid,
        author: author,
        categories: '',
        date: Date.parse(publish_date)
    }
);

module.exports = {
    get_blogs_rss: function (req, res, blogmetadata_map, exclude = ['/episodes', '/transcripts']) {
        let blogs = filter(blogmetadata_map, (post, key) => {
            return key !== 'latest';
        });

        blogs = map(blogmetadata_map, (post) => {
            return post;
        });

        let feed = new RSS({
            title: 'Data Skeptic',
            description: 'Data Skeptic is your source for a perseptive of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science. Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.',
            feed_url: 'https://dataskeptic.com/api/blog/rss',
            site_url: 'https://dataskeptic.com/',
            managingEditor: 'Kyle',
            language: 'en'
        });

        each(blogs, (blog) => {
            feed.item(BlogItemModel(blog));
        });

        const xml = feed.xml();

        return res.status(200).end(xml)
    }
}