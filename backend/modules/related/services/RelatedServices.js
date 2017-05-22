import list from "../constants/list"

export const getRelatedByURI = (name) => {
    return  Promise.resolve(list[name]);
};