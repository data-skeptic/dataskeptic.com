import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'
import {ContactInput} from "./Input";
import Link from '../../components/Link'

const ContactForm = ({handleSubmit, reset, submitting, pristine, values}) => (
    <form onSubmit={handleSubmit}>

        <Field name="fullName"
               component={ContactInput}
               type="text"
               label="Name"
               placeholder="Name"
        />

        <Field name="email"
               component={ContactInput}
               type="email"
               label="Email"
               placeholder="Email"
        />
        <Field
            name="message"
            component={ContactInput}
            textarea
            label="Message"
        />
        <Submit type="submit">Submit</Submit>
    </form>
)
export default ContactForm
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



