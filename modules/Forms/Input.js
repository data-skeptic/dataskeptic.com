import React from 'react'

export const Input = ({input, meta, placeholder, label,type,textarea}) => (
    <div>
        {label && <label>{label}</label>}
        {textarea ?  <textarea {...input} /> : <input  {...input} placeholder={placeholder} type={type}/>}
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
)