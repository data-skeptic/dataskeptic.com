import each from 'lodash/each';
import filter from 'lodash/filter';
import sort from 'lodash/sortBy';

import moment from 'moment';

const ignoredKeys = ['latest', 'guid'];
function isIgnoredKey(key) {
    return ignoredKeys.includes(key);
}

function isMatchingQuery(blog, {url = '', exclude = [], env}) {
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
}

function matchingOffset(blog, index, offset) {
    return (index >= offset);
}

function matchingLimit(blog, index, limit) {
    return (index < limit);
}

function compare(dateTimeA, dateTimeB) {
    const momentA = moment(dateTimeA,"YYYY-MM-DD");
    const momentB = moment(dateTimeB,"YYYY-MM-DD");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}

module.exports = {
    get_blogs: function (req, res, blogmetadata_map, env, exclude = ['/episodes', '/transcripts']) {
        env = (env === 'prod') ? 'master' : 'dev';

        const params = req['params'];
        const query = req.query;

        let url = req.url;
        const x = req.url.indexOf('?');
        if (x > 0) {
            url = url.substring(0, x)
        }

        const pre = '/api/blog';
        url = url.substring(pre.length, url.length);

        const offset = query['offset'] || 0;
        const limit = query['limit'] || 10;

        // remove unnecessary keys
        let blogs = filter(blogmetadata_map, (blog, id) => !isIgnoredKey(id));
        // filter only relative blogs
        blogs = filter(blogs, (blog, id) => isMatchingQuery(blog, {url, exclude, env}));

        // calculate total matched blogs count
        const total = blogs.length;

        blogs = blogs.sort((a, b) => {
            // custom sort by publish data
            return compare(b['publish_date'], a['publish_date']);
        });

        // slice over limits
        blogs = blogs
            .filter((blog, index) => matchingOffset(blog, index, offset))
            .filter((blog, index) => matchingLimit(blog, index, limit));

        const latestId = blogmetadata_map['latest']['c_hash'];

        return res.status(200).end(JSON.stringify({
            env,
            blogs,
            total,
            latestId
        }))
    }
};