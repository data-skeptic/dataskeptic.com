export const contactFormValidator = values => {
    const errors = {};
    errors.email = !values.email && "Required"
    errors.fullName = !values.fullName && "Required"
    errors.message = !values.message && "Required"
    return errors
}