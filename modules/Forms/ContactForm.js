import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'
import {Input} from "./Input";

const ContactForm = ({handleSubmit, reset, submitting, pristine, values}) => (
    <form onSubmit={handleSubmit}>
        <ContactInput name="fullName"
               component={Input}
               type="text"
               label="Name"
               placeholder="Name"
        />
        <ContactInputnpm name="email"
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
            <button type="submit">Submit</button>
    </form>
)
export default ContactForm

const ContactInput = styled(Field)`
  input{
    padding: 12px 16px;
    background: #fff;
    border: 1px solid #d7d9d9;
    border-radius: 4px;
    width: 100%;
  }
`