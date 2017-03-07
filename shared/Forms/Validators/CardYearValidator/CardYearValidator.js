/**
 * Validate Card Year Number
 *
 * @return {boolean} valid state
 */
export const CardYearValidator = (year='01') => {
    year = (+year) || 1;


    return year >= 1990 && year <= 2100;
};

export default CardYearValidator;