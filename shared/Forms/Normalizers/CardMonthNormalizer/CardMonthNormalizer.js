/**
 * Normalize input string to formatted card expiration month
 *
 * @param {String} value Input value
 * @param {String} previousValue Prev input value
 *
 * @return {string}
 */
const CardMonthNormalizer = (value, previousValue) => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '');

    return onlyNums.slice(0, 2);
};

export default CardMonthNormalizer;