import { numbers } from '../'

/**
 * Validate Phone Number
 *
 * @return {boolean} valid state
 */
export const PhoneValidator = (phoneNumber = '') => {
  const onlyNumbers = numbers(phoneNumber)
  if (!onlyNumbers) {
    return false
  }

  return onlyNumbers.toString().length === 10
}

export default PhoneValidator
