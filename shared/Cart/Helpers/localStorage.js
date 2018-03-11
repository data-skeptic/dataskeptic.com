import { LOCAL_STORAGE_KEY } from '../Constants'

const EMPTY_STR_OBJ = '[]'

export function put(items) {
  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
}

export function take() {
  let oItems = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!oItems) {
    oItems = EMPTY_STR_OBJ
  }

  return JSON.parse(oItems)
}

export function clear() {
  return localStorage.removeItem(LOCAL_STORAGE_KEY)
}
