import isNaN from 'lodash/isNaN'

/**
 * Validate Card Year Number
 *
 * @return {boolean} valid state
 */
export const OnlyNumbersValidator = value => {
  let onlyNums = +value.replace(/[^\d]/g, '')

  return isNaN(onlyNums) ? false : onlyNums
}

export default OnlyNumbersValidator
