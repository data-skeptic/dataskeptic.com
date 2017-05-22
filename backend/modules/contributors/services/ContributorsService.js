import list from "../constants/list"

 export const getContributorByName = (name) => {
    return  Promise.resolve(list[name]);
};

