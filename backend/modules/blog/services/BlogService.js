import axios from 'axios';

import PostModel from '../models/Post';

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

const isBlog = (pn) => pn.indexOf("/episodes/") !== 0 && pn.indexOf("/transcripts/") !== 0;

export const getAll = () => {
    const uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + ENV + "/blogs?env=" + DB_ENV;
    return axios.get(uri)
        .then((result) => {
            return result.data
                .filter((blog) => isBlog(blog.prettyname))
                .map((blog) => PostModel(blog));
        })
        .catch((err) => {
            console.log(err);
        })
};

export const getPost = (prettyName) => {
    const uri = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + ENV + "/blog?env=" + DB_ENV + "&pn=" + prettyName;
    return axios.get(uri)
        .then((result) => {
            const post = PostModel(result.data);

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

export const getCategories = () => {

};