/**
 * Normalize input string to formatted phone number
 *
 * @param {String} value Input value
 * @param {String} previousValue Prev input value
 *
 * @return {string}
 */
const PhoneNumberNormalizer = (value, previousValue) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 3) {
            return onlyNums + '-'
        }

        if (onlyNums.length === 6) {
            return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
        }
    }

    if (onlyNums.length <= 3) {
        return onlyNums
    }

    if (onlyNums.length <= 6) {
        return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
    }

    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
};

export default PhoneNumberNormalizer;