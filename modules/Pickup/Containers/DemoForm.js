import React, { Component } from 'react'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

const FORM_KEY = 'snippetForm'

@connect(state => ({}), {})
@reduxForm({
    form: FORM_KEY
})
export default class DemoForm extends Component {

    render() {
        const {className, handleSubmit, invalid} = this.props

        return (
            <form onSubmit={handleSubmit} className={className}>
                <Field
                    name="resumeSnippet"
                    label="Snippet"
                    component="input"
                />

                <Buttons>
                    <CancelButton href="/resume">Cancel</CancelButton>
                    <SubmitButton type="submit" disabled={invalid}>
                        <Icon name="cloud"/> Save
                    </SubmitButton>
                </Buttons>
            </form>
        )
    }
}

const Buttons = styled.div``
const CancelButton = styled.button``
const SubmitButton = styled.button``