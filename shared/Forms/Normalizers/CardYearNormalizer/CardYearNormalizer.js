/**
 * Normalize input string to formatted card expiration year
 *
 * @param {String} value Input value
 * @param {String} previousValue Prev input value
 *
 * @return {string}
 */
const CardYearNormalizer = (value, previousValue) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')

  return onlyNums.slice(0, 4)
}

export default CardYearNormalizer
