import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'
import {Input} from "./Input";

const ContactForm = ({handleSubmit, reset, submitting, pristine, values}) => (
    <form onSubmit={handleSubmit}>
        <Field name="fullName"
               component={Input}
               type="text"
               placeholder="Name"
        />
        <Field name="email"
               component={Input}
               type="email"
               placeholder="Email"
        />
        <Field name="message"
               component={Input}
               textarea
        />
    </form>
)
export default ContactForm