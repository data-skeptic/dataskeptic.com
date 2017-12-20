import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'
import Input from "./Input";

const Checkout = ({handleSubmit, reset, submitting, pristine, values}) => (
    <form onSubmit={handleSubmit}>
        <Field name="fullName"
               component={Input}
               type="text"
               label="Name"
               placeholder="Name"
        />

        <Field name="email"
               component={Input}
               type="email"
               label="Email"
               placeholder="Email"
        />

        <Field
            name="message"
            component={Input}
            textarea
            label="Message"
        />

        <Submit type="submit">Submit</Submit>
    </form>
)
export default Checkout

const Submit = styled.button`
    padding:10px 20px;
    background-color: #f0d943;
    border:none;
    border-radius: 5px;
    color:white;
    cursor: pointer;
`

const Title = styled.h1`
`



