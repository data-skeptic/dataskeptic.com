import React from 'react';
import className from 'classnames';

export const renderField = ({
    input, label, type, textarea, required, meta: { touched, error, warning, invalid },
    fieldWrapperClasses = '', labelWrapperClasses = '', inputWrapperStyles = ''
}) => {
    const textareaType = <textarea {...input} placeholder={label}  type={type} className={`${inputWrapperStyles} ${touched && invalid ? 'has-danger' : ''}`}/>;
    const inputType = <input {...input} placeholder={label}  type={type} className={`${touched && invalid ? 'has-danger' : ''}`}/>;

    return (
        <div className={`field-container ${fieldWrapperClasses}`}>
            <div className={`field-label ${labelWrapperClasses}`}>{label}&nbsp;{required ? <span className="required">*</span> : null}</div>
            <div className={`field-input ${inputWrapperStyles}`}>
                {textarea ? textareaType : inputType}

                <p className="error-message">{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</p>
            </div>
        </div>
    );
};

export default renderField;