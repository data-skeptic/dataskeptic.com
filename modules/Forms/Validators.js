export const contactFormValidator = values => {
    const errors = {};
    values.email ? '' : errors.email = "Required"
    return errors
}