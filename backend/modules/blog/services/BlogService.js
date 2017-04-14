import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import PostModel from '../models/Post';

const ContributorsService = require('../../contributors/services/ContributorsService');
const RelatedService = require('../../related/services/RelatedService');

const ENV = global.env;
const DB_ENV = (ENV === 'prod' ? 'master' : ENV);
const RENDER_ENV = (() => {
    if (ENV === "prod" || ENV === "master") {
        return '';
    }

    if (!ENV) {
        return '';
    }

    return ENV + '.';
})();

const POST_NOT_FOUND_ERROR = {
    error: 'Post not found'
};

const isBlog = (pn) => pn.indexOf("/episodes/") !== 0 && pn.indexOf("/transcripts/") !== 0;

export const extendPost = (post) => {
    post.contributor = ContributorsService.getByAuthor(post.author);
    post.related = RelatedService.getByUrl(post.prettyname);
    return post;
};

export const getAll = () => {
    const uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + ENV + "/blogs?env=" + DB_ENV;
    return axios.get(uri)
        .then((result) => {
            return result.data
                .filter((post) => isBlog(post.prettyname))
                .map((post) => {
                    post = extendPost(post);
                    return PostModel(post);
                });
        })
        .catch((err) => {
            console.log(err);
        })
};

export const getPost = (prettyName) => {
    const uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + ENV + "/blog?env=" + DB_ENV + "&pn=" + prettyName;
    return axios.get(uri)
        .then((result) => {
            const postExists = !isEmpty(result.data);
            if (!postExists) {
                return POST_NOT_FOUND_ERROR;
            }

            const postData = extendPost(result.data);
            const post = PostModel(postData);
            return getPostContent(post.rendered)
                .then((contentRes) => {
                    post.content = contentRes;

                    return post;
                });
        })
        .catch((err) => {
            console.log(err);
        })
};

export const getPostContent = (rendered) => {
    const uri = "https://s3.amazonaws.com/" + RENDER_ENV + 'dataskeptic.com/' + rendered;
    return axios.get(uri)
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            console.log(err);
        })
};

export const extractCategories = (blogs) => {
    let folders = []
    for (var i in blogs) {
        var b = blogs[i]
        var pn = b.url;
        if (pn != undefined) {
            var arr = pn.split("/")
            var level = 0
            if (arr.length >= level+2) {
                var folder = arr[level+1]
                folders.push(folder)
            }
        }
    }
    folders = folders.reduce((a, x) => a.includes(x) ? a : [...a, x], []).sort();
    return folders;
};


export const getCategories = () => {
    return getAll()
        .then((blogs = []) => {
            return extractCategories(blogs);
        })
};