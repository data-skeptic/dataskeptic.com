const express = require('express');
import filter from 'lodash/filter';
import moment from 'moment';
import Post from "../models/Post";
const map = require('lodash/map');
const ContributorsService = require("../../contributors/services/ContributorsService")
const RelatedServices = require("../../related/services/RelatedServices")


const NOT_FOUND_ERROR = {
    error: true,
    message: "Not Found"
};

const ignoredKeys = ['latest', 'guid'];
function isIgnoredKey(key) {
    return ignoredKeys.includes(key);
}
function matchingOffset(blog, index, offset) {
    return (index >= offset);
}

function matchingLimit(blog, index, limit) {
    return (index < limit);
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

function compare(dateTimeA, dateTimeB) {
    const momentA = moment(dateTimeA, "YYYY-MM-DD");
    const momentB = moment(dateTimeB, "YYYY-MM-DD");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}

const extendBlogsWithContributors = (blogs) => {
    const extendedBlogs = blogs.map((blog) => {
        const author = blog.author;

        return ContributorsService.getContributorByName(author)
            .then((contributor) => {
                blog.contributor = contributor;
                return blog;
            })
    });


    return Promise.all(extendedBlogs)
};

export const getAll = (url, blogmetadata_map, offset, limit, env, exclude = ['/episodes', '/transcripts']) => {

    console.dir("blogs = " + blogmetadata_map);
    // remove unnecessary keys
    let blogs = filter(blogmetadata_map, (blog, id) => !isIgnoredKey(id));
    // filter only relative blogs
    console.dir("blogs2 = " + blogs);
    blogs = filter(blogs, (blog, id) => isMatchingQuery(blog, {url, exclude, env}));
    console.dir("blogs3 = " + blogs);
    // calculate total matched blogs count
    const total = blogs.length;

    blogs = blogs.sort((a, b) => {
        // custom sort by publish data
        return compare(b['publish_date'], a['publish_date']);
    });
    console.dir("blogs4 = " + blogs);
    // slice over limits
    blogs = blogs
        .filter((blog, index) => matchingOffset(blog, index, offset))
        .filter((blog, index) => matchingLimit(blog, index, limit));
    console.dir("blogs5 = " + blogs);
    var latestId = "";
    if (Object.keys(blogmetadata_map).length > 0) {
        latestId = blogmetadata_map['latest']['c_hash'];
    }

    return Promise.all([
        extendBlogsWithContributors(blogs)
    ]).then(([posts]) => {
        return new Promise((resolve, reject) => {
            resolve({
                env,
                posts,
                total,
                latestId
            })
        })
    });
};
    const isExist = (blogmetadata_map, prettyName) => !!blogmetadata_map[prettyName];

    export const getPost = (blogmetadata_map, prettyName, content_map) => {

        let postData = null;
        let author = null;
        let relative = null;
        if (isExist(blogmetadata_map, prettyName)) {
            const post = blogmetadata_map[prettyName];
            author = post["author"];
            console.dir("pretty = " + prettyName)
            relative = prettyName;
            postData = new Post({
                prettyname: prettyName,

                title: post['title'],
                content: content_map[prettyName] || '',

                isEpisode: post['isEpisode'] || false,

                contributor: post['contributor'],
                related: post['related'],

                rendered: post['rendered'],

                discoveredAt: post['date_discovered'],
                renderedAt: post['last_rendered'],
                publishedAt: post['publish_date'],

                author: post['author'],

                env: post['env'],
                desc: post['desc'],


            });
        }
        console.dir("final = " + "/blog" + relative.toLowerCase());
        return Promise.all([
            ContributorsService.getContributorByName(author.toLowerCase()),
            RelatedServices.getRelatedByURI("/blog" + relative.toLowerCase())
        ]).then(([contributor, relative]) => {
            return postData ?
                {
                    ...postData,
                    contributor,
                    relative
                }
                : NOT_FOUND_ERROR
        })
    }



