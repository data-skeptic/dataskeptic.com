const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

/**
 * Validate email
 *
 * @return {boolean} valid state
 */
export const EmailValidator = email => {
  return email && emailRegex.test(email)
}

export default EmailValidator
