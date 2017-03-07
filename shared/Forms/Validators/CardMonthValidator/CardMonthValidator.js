/**
 * Validate Card Month Number
 *
 * @return {boolean} valid state
 */
export const CardMonthValidator = (month='01') => {
    month = (+month) || 1;

    return month >= 1 && month <= 12;
};

export default CardMonthValidator;