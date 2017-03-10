import React, { PropTypes } from 'react';

export const FormController = ({ name, children, handleSubmit, submitSucceeded, submitting, pristine, invalid, submitValue }) => (
    <form className={`form ${name}-form row`} onSubmit={handleSubmit} autoComplete="false">
        {children}

        { !submitSucceeded && !submitting ?
            <div className="col-xs-12 col-sm-12">
                <button className="btn contact-send" type="submit" disabled={(pristine || invalid) || submitting} >{submitValue}</button>
            </div>
        : null}
    </form>
);

FormController.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    submitValue: PropTypes.string
};

export default FormController;