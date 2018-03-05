import React from 'react'
import Zip from 'react-zipcode'

export const renderZip = ({
    input, label, type, placeholder, required, meta: { touched, error, warning, invalid },
    fieldWrapperClasses = '', labelWrapperClasses = '', inputWrapperStyles = ''
}) => {
    return (
        <div className={`field-container ${fieldWrapperClasses}`}>
            <div className={`field-label ${labelWrapperClasses}`}>{label}&nbsp;{required ? <span className="required">*</span> : null}</div>
            <div className={`field-input ${inputWrapperStyles}`}>
	            <Zip onValue={(value) => input.onChange(value)} className={`${inputWrapperStyles} ${touched && invalid ? 'has-danger' : ''}`} />

              <p className="error-message">{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</p>
            </div>
        </div>
    );
};

export default renderZip;