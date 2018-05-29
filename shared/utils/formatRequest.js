import { map, isNumber, isBoolean, isString, compact } from 'lodash'

const isStrUndefined = val =>
  val === 'undefined' || val === 'null' || val === 'NaN'

export default params =>
  compact(
    map(params, (val, key) => {
      const empty =
        !(isNumber(val) || isString(val) || isBoolean(val)) ||
        isStrUndefined(val)
      return empty ? null : key + '=' + decodeURIComponent(val)
    })
  ).join('&')
