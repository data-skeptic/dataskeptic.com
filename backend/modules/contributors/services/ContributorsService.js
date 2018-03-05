import list from '../constants/list'

export const getContributorByName = (name = '') => {
  name = name && name.toLowerCase()
  return Promise.resolve(list[name])
}

export const getAllContributors = () => {
  return Promise.resolve(list)
}
