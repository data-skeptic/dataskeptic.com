import React from 'react'
import styled from 'styled-components'

export default ({input, meta, placeholder, label, type, textarea}) => (
    <InputWrapper>
        {label && <label>{label}</label>}
        {textarea ? <textarea {...input} /> : <input  {...input} placeholder={placeholder} type={type}/>}
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </InputWrapper>
)

const InputWrapper = styled.div`
    margin-bottom:20px;
    input,textarea{
      padding: 12px 16px;
      background: #fff;
      border: 1px solid #d7d9d9;
      border-radius: 4px;
      width: 100%;
  }
  label{
    color: #575959;
  }
`