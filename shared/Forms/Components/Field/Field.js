import React from 'react';

export const renderField = ({ input, label, type, textarea, required, meta: { touched, error, warning, invalid } }) => {
    const textareaType = <textarea {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
    const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;

    return (
        <div>
            <div className={`col-xs-12 col-sm-12`}>{label}&nbsp;{required ? <span className="required">*</span> : null}</div>
            <div className="col-xs-12 col-sm-12">
                {textarea ? textareaType : inputType}

                <p className="error-message">{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</p>
            </div>
        </div>
    );
};

export default renderField;