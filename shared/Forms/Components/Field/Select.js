import React from 'react'
import className from 'classnames'

export const renderSelect = ({
  input,
  label,
  type,
  placeholder,
  required,
  meta: { touched, error, warning, invalid },
  fieldWrapperClasses = '',
  labelWrapperClasses = '',
  inputWrapperStyles = '',
  options = []
}) => {
  return (
    <div className={`field-container ${fieldWrapperClasses}`}>
      <div className={`field-label ${labelWrapperClasses}`}>
        {label}&nbsp;{required ? <span className="required">*</span> : null}
      </div>
      <div className={`field-input ${inputWrapperStyles}`}>
        <select
          {...input}
          className={`${inputWrapperStyles} ${
            touched && invalid ? 'has-danger' : ''
          }`}
        >
          {options.map(op => (
            <option value={op.value} key={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <p className="error-message">
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </p>
      </div>
    </div>
  )
}

export default renderSelect
