import React from 'react'
import styled from 'styled-components'
import {Field} from 'react-final-form'
import CountrySelector from "../Store/Components/CountrySelector";
import Ionicon from 'react-ionicons'
import {media} from "../styles";

const renderField = ({cols = 1, label, input, meta, required, ...rest}) => (
    <FieldWrapper cols={cols}>
        <Label>{label} {required && <Required>*</Required>}</Label>
        <Input error={true} hasError={meta.touched && !!meta.error}><input {...input} {...rest} /></Input>
        <Error>{meta.touched && meta.error && <span>{meta.error}</span>}</Error>
    </FieldWrapper>
)

const Checkout = ({handleSubmit, reset, submitting, pristine, values}) => (
    <form onSubmit={handleSubmit}>
        <Section>
            <SectionTitle>Shipping Information</SectionTitle>
            <Fields>
                <Row>
                    <Field
                        name="firstName"
                        type="text"
                        label="First Name"
                        placeholder="John"
                        render={renderField}
                        required
                    />

                    <Field
                        label="Last Name"
                        placeholder="Smith"
                        name="lastName"
                        type="text"
                        render={renderField}
                    />
                </Row>

                <Row>
                    <Field
                        name="streetAddress"
                        placeholder="123 Main Street"
                        type="text"
                        label="Street Address"
                        render={renderField}
                        cols={3}
                        required
                    />

                    <Field
                        name="apt"
                        label="Apt, suite, etc."
                        placeholder="Apt 101"
                        type="text"
                        render={renderField}
                    />
                </Row>

                <Row>
                    <Field
                        name="city"
                        type="text"
                        label="City / Town"
                        placeholder="Los Angeles"
                        render={renderField}
                        required
                    />
                </Row>

                <Row>
                    <Field
                        name="country"
                        type="text"
                        label="TODO: country"
                        render={renderField}
                        required
                    />

                    <Field
                        name="state"
                        type="text"
                        label="State / Province"
                        placeholder="12345"
                        render={renderField}
                        required
                    />

                    <Field
                        name="postal"
                        label="Postal Code"
                        placeholder="John"
                        type="text"
                        render={renderField}
                    />
                </Row>

                <Row>
                    <Field
                        name="email"
                        type="email"
                        label="Email"
                        render={renderField}
                        placeholder="j.smith@work.com"
                        required
                    />

                    <Field
                        name="phone"
                        type="text"
                        label="Phone"
                        placeholder="(310) 313 - 3413"
                        render={renderField}
                        required
                    />
                </Row>
            </Fields>
        </Section>

        <Section>
            <SectionTitle>Billing Details</SectionTitle>
            <Fields>
                <Fields>
                    <Row>
                        <Field
                            name="card"
                            type="text"
                            placeholder="4242 4242 4242 4242"
                            label="Credit Card Number"
                            render={renderField}
                            required
                        />
                    </Row>

                    <Row>
                        <Field
                            name="cardHolder"
                            type="text"
                            placeholder="Jonh Smith"
                            label="Cardholder Name"
                            render={renderField}
                            required
                            cols={3}
                        />

                        <Field
                            name="month"
                            type="text"
                            placeholder="12"
                            label="Month"
                            render={renderField}
                            required
                        />

                        <Field
                            name="year"
                            type="text"
                            placeholder="2020"
                            label="Year"
                            render={renderField}
                            required
                        />

                        <Field
                            name="cvv"
                            type="text"
                            placeholder="123"
                            label="CVV"
                            render={renderField}
                            required
                        />
                    </Row>
                </Fields>
            </Fields>
        </Section>
        <Submit type="submit">Complete Order</Submit>
    </form>
)
export default Checkout

const Submit = styled.button`
    padding: 10px 20px;
    background-color: #f0d943;
    border:none;
    border-radius: 5px;
    color:white;
    cursor: pointer;
`

const Section = styled.div`margin-bottom: 30px;`
const SectionTitle = styled.div`
    font-size: 14pt;
    margin: 10px 0px 10px 0px;
`

const Fields = styled.div`
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    width: 100%;

    ${media.tablet`
        flex-direction: column;
    `}
    
    ${media.phone`
        flex-direction: column;
    `}
`

const FieldWrapper = styled.div`
    flex: ${props => props.cols};
    padding-right: 15px;
    
    ${media.tablet`
        flex: 1;
    `}
    
    ${media.phone`
        flex: 1;
    `}
    
   
`

const Input = styled.div`
    input {
        padding: 12px 16px;
        background: #fff;
        border: 1px solid #d7d9d9;
        border-radius: 4px;
        width: 100%;
        
        ${props => props.hasError && `
            color: indianred;
            border: 1px solid indianred;
        `}
    }
`
const Error = styled.div`
    color: indianred;
    margin: 0 0 10.5px;
`

const Label = styled.div`
    font-size: 14px;
    color: #575959;
    letter-spacing: 0;
    margin-top: 32px;
    margin-bottom: 16px;  
`

const Required = styled.span`color: red;`