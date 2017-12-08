import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'
import {Input} from "./Input";
import Link from '../../components/Link'

const ContactForm = ({handleSubmit, reset, submitting, pristine, values}) => (
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
        <button type="submit">Submit</button>
    </form>
)
export default ContactForm


