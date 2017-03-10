/**
 * Normalize input string to formatted card cvv number
 *
 * @param {String} value Input value
 * @param {String} previousValue Prev input value
 *
 * @return {string}
 */
const CardCVVNormalizer = (value, previousValue) => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '');

    return onlyNums.slice(0, 3);
};

export default CardCVVNormalizer;