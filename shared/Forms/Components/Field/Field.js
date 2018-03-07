import React from "react"
import className from "classnames"

export const renderField = ({
  input,
  label,
  type,
  textarea,
  customComponent,
  placeholder,
  required,
  meta: { touched, error, warning, invalid },
  fieldWrapperClasses = "",
  labelWrapperClasses = "",
  inputWrapperStyles = ""
}) => {
  const textareaType = (
    <textarea
      {...input}
      placeholder={placeholder}
      type={type}
      className={`${inputWrapperStyles} ${
        touched && invalid ? "has-danger" : ""
      }`}
    />
  )
  const inputType = (
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className={`${touched && invalid ? "has-danger" : ""}`}
    />
  )

  const CustomComponent = customComponent
  const inputComponent = customComponent
    ? <CustomComponent input={input} />
    : textarea ? textareaType : inputType

  return (
    <div className={`field-container ${fieldWrapperClasses}`}>
      <div className={`field-label ${labelWrapperClasses}`}>
        {label}&nbsp;{required ? <span className="required">*</span> : null}
      </div>
      <div className={`field-input ${inputWrapperStyles}`}>
        {inputComponent}

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
