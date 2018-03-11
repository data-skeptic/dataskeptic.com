/**
 * Validate CVV code
 *
 * @return {boolean} valid state
 */
export const CardCVVValidator = (CVV = '') => {
  return CVV.length === 3
}

export default CardCVVValidator
