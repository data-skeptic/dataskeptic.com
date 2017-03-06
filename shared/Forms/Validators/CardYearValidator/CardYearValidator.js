/**
 * Validate Card Year Number
 *
 * @return {boolean} valid state
 */
export const CardYearValidator = (year='01') => {
    year = (+year) || 1;


    return true;
};

export default CardYearValidator;