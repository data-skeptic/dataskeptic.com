const express = require('express');
import filter from 'lodash/filter';
import moment from 'moment';
import Post from "../models/Post";
const ContributorsService = require( "../../contributors/services/ContributorsService")
import axios  from 'axios'

const NOT_FOND_ERROR = {
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
    const momentA = moment(dateTimeA,"YYYY-MM-DD");
    const momentB = moment(dateTimeB,"YYYY-MM-DD");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}

export const getAll = (url, blogmetadata_map, offset, limit, env, exclude = ['/episodes', '/transcripts']) => {

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

    var latestId = "";
    if (Object.keys(blogmetadata_map).length > 0) {
        latestId = blogmetadata_map['latest']['c_hash'];
    }


    return new Promise((resolve, reject) => {
        resolve({
            env,
            blogs,
            total,
            latestId
        })
    })
};

const isExist = (blogmetadata_map, prettyName) => !!blogmetadata_map[prettyName];

export const getPost = (blogmetadata_map, prettyName, content_map) => {
    let postData = null;
    let author = null;
    if (isExist(blogmetadata_map, prettyName)) {
        const post = blogmetadata_map[prettyName];
        author = post["author"];
        postData = new Post({
            url: post['prettyname'],
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
            desc : post['desc'],


        });
    }

    return Promise.all([
        ContributorsService.getContributorByName(author.toLowerCase())
    ]).then(([contributor]) => {
        return postData ?
            {
                ...postData,
                contributor
            }
        : NOT_FOND_ERROR
    })
};


