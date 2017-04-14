const list = require('../constants/list');

const EMPTY_RELATED = null;

export const getByUrl = (url='') => {
    return list[`/blog${url}`] || EMPTY_RELATED;
};

export const getAll = () => {
    return Promise.resolve(list);
};