const list = require('../constants/list');

const EMPTY_CONTRIBUTOR = {};

export const getByAuthor = (author='') => {
    return list[author.toLowerCase()] || EMPTY_CONTRIBUTOR;
};

export const getAll = () => {
    return Promise.resolve(list);
};