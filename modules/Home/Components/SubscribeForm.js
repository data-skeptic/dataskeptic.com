import React, {Component} from 'react'
import styled from 'styled-components'
import { Field } from "react-final-form";
const SubscribeForm = ({ handleSubmit, reset, submitting, pristine, values }) => (
            <Form onSubmit={handleSubmit}>
                <Title>Subscribe to our mailing list</Title>
                <FormWrap>
                    <Field
                        name="email"
                        component="input"
                        type="text"
                        placeholder="Email"
                    />
                    <Submit type="submit" disabled={submitting || pristine}>
                        Submit
                    </Submit>
                </FormWrap>
            </Form>
        )

export default SubscribeForm

const Form = styled.form`
    display: flex;
    align-items: center;
    margin-top: 20px;
    flex-direction: column;
`

const FormWrap = styled.div`
    margin-top: 10px;
    & > input {
        width: 400px;
        margin-right: 5px;
        padding: 19px 29px;
        border: none;
        background-color: #f9f9f9;
        color: #c1c1c1;
        
        border-radius: 5px;
    }
    display: flex;
`

const Submit = styled.div`
    width: 220px;
    border-radius: 5px;
    color: #fff;
    background-color: #f0d943;
    text-transform: uppercase; 
    -webkit-appearance: none;
    font-family: "SF Medium";
    text-align: center;
    padding: 19px;
`

const Title = styled.div`
    margin: 20px 0px;
    color: rgba(55, 55, 55, 0.87);  
`