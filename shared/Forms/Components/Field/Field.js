import React from 'react';
import className from 'classnames';

export const renderField = ({
    input, label, type, textarea, required, meta: { touched, error, warning, invalid },
    fieldWrapperClasses = '', labelWrapperClasses = '', inputWrapperStyles = ''
}) => {
    const textareaType = <textarea {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
    const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;

    return (
        <div className={fieldWrapperClasses}>
            <div className={labelWrapperClasses}>{label}&nbsp;{required ? <span className="required">*</span> : null}</div>
            <div className={inputWrapperStyles}>
                {textarea ? textareaType : inputType}

                <p className="error-message">{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</p>
            </div>
        </div>
    );
};

export default renderField;