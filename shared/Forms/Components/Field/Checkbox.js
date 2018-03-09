import React from 'react'
import className from 'classnames'

export const renderField = ({
  input,
  label,
  placeholder,
  required,
  meta: { touched, error, warning, invalid },
  fieldWrapperClasses = '',
  labelWrapperClasses = '',
  inputWrapperStyles = ''
}) => {
  return (
    <div className={`field-container ${fieldWrapperClasses}`}>
      <div className={`field-input ${inputWrapperStyles}`}>
        <label className={`field-label ${labelWrapperClasses}`}>
          <input type="checkbox" {...input} />
          {'  '}
          {label}&nbsp;{required ? <span className="required">*</span> : null}
        </label>

        <p className="error-message">
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </p>
      </div>
    </div>
  )
}

export default renderField
