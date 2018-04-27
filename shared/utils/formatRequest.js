import { map, isNumber,isBoolean, isString, compact } from 'lodash'

export default params =>
  compact(
    map(params, (val, key) => {
      const empty = !(isNumber(val) || isString(val)|| isBoolean(val))
      return empty ? null : key + '=' + decodeURIComponent(val)
    })
  ).join('&')
