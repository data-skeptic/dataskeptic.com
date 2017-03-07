import React, { PropTypes } from 'react';

export const FormController = ({ name, children, handleSubmit, submitSucceeded, submitting, pristine, invalid, submitValue, btnWrapperClasses='col-xs-12 col-sm-12' }) => (
    <form className={`form ${name}-form row`} onSubmit={handleSubmit} autocomplete="false">
        {children}

        { !submitSucceeded && !submitting ?
            <div className={btnWrapperClasses}>
                <button className="btn contact-send" type="submit" disabled={(pristine || invalid) || submitting} >
                    {submitValue}
                </button>
            </div>
        : null}
    </form>
);

FormController.propTypes = {
    name: PropTypes.string.required,
    children: PropTypes.node,
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    submitValue: PropTypes.node
};

export default FormController;