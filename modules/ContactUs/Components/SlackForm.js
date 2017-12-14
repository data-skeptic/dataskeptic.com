import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'

const SlackForm = ({handleSubmit, reset, submitting, pristine, values}) => (
    <Form onSubmit={handleSubmit}>
        <Field name="email"
               render={({input, meta}) => (
                   <InputWrapper>
                       <Input type="email" {...input} placeholder="Email"/>
                       {meta.touched && meta.error && <span>{meta.error}</span>}
                   </InputWrapper>
               )}

        />
        <Submit type="submit">Join</Submit>
    </Form>
)
export default SlackForm

const Form = styled.form`
 
`
const InputWrapper = styled.div`
  display: inline-block;
`
const Input = styled.input`
  width: 460px;
  border-radius: 5px;
  background-color: #f9f9f9;
  padding:13px 20px;
  border:1px solid rgba(0, 0, 0, 0.1);
`
const Submit = styled.button`
  padding:13px 53px;
  margin-left:10px;
  border:1px solid rgba(0, 0, 0, 0.1);
  background-image:url("static/Slack_Mark.svg");
  background-size: 400%;
  background-position: -205px 52%;
  cursor: pointer;
`