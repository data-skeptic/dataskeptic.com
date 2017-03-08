import React, { PropTypes } from 'react';

export const FormController = ({ name, children, handleSubmit, submitSucceeded, submitting, customSubmitting, pristine, invalid, submitValue, btnWrapperClasses='col-xs-12 col-sm-12', customError }) => (
    <form className={`form ${name}-form row`} onSubmit={handleSubmit} autoComplete="false">
        {children}

        { !submitSucceeded && !submitting ?
            <div className={btnWrapperClasses}>
                <button className="btn contact-send" type="submit" disabled={(pristine || invalid) || submitting || customSubmitting} >
                    {submitValue}
                </button>
            </div>
        : null}

        <div className="col-md-12">
            { customError ? <p className="error-message">{customError}</p> : null }
        </div>
    </form>
);

FormController.propTypes = {
    name: PropTypes.string.required,
    children: PropTypes.node,
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    customSubmitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    customError: PropTypes.string,
    submitValue: PropTypes.node
};

export default FormController;