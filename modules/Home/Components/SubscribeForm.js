import React from 'react'
import styled from 'styled-components'
import {media} from "../../styles";

const SUBSCRIBE_URL = `//dataskeptic.us9.list-manage.com/subscribe/post?u=65e63d6f84f1d87759105d133&id=dc60d554db`

const SubscribeForm = () => (
    <Form
        action={SUBSCRIBE_URL}
        target="_blank"
        method={`POST`}
    >
        <Title>Subscribe to our mailing list</Title>
        <Fields>
            <Field
                name="EMAIL"
                component="input"
                type="text"
                placeholder="Email"
            />
            <Submit type="submit">
                Submit
            </Submit>
        </Fields>
    </Form>
)

export default SubscribeForm

const Form = styled.form`
    display: flex;
    align-items: center;
    margin-top: 60px;
    flex-direction: column;
    
    * {
        box-sizing: border-box;
    }
`

const Fields = styled.div`
    margin-top: 10px;
    & > input {
        width: 100%;
        margin-right: 5px;
        padding: 19px 29px;
        border: none;
        background-color: #f9f9f9;
        color: #c1c1c1;
        
        border-radius: 5px;
    }
    display: flex;

    ${media.phone`
        flex-direction: column;
        width: 80%;
    `};
`

const Field = styled.input``

const Submit = styled.button`
    width: 220px;
    border-radius: 5px;
    color: #fff;
    background-color: #f0d943;
    text-transform: uppercase; 
    -webkit-appearance: none;
    text-align: center;
    padding: 19px;
    border: 0px;
 
    ${media.phone`
        margin-top: 10px;
        width: 100%;
    `};
`

const Title = styled.div`
    margin: 20px 0px;
    color: rgba(55, 55, 55, 0.87);  
`