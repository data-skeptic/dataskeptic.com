import React, {Component} from 'react'
import Icon from 'react-ionicons'
import styled from 'styled-components'
import {Form} from 'react-final-form'
import {contactFormValidator} from "../../Forms/Validators";
import ContactForm from '../../Forms/ContactForm'

export default class ContactUsContainer extends Component {
    render() {
        return (
            <div>
                <p>
                    We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our
                    queue to explode. We prioritize responses to Data Skeptic members first, and to those who ask
                    questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack.
                    Many people can benefit from responses in public places.
                </p>
                <Wrapper>
                    <EmailsList>
                        <h2>Contact Us via Email</h2>
                        <div>
                            <Title>Purchase</Title>
                            <EmailWrapper>
                                <Icon style={{marginRight:"30px"}} icon="ios-mail-outline" fontSize="35px"/>
                                <Email>
                                    orders@dataskeptic.com
                                </Email>
                            </EmailWrapper>
                        </div>
                        <div>
                            <Title>Advertising</Title>
                            <EmailWrapper>
                                <Icon style={{marginRight:"30px"}} icon="ios-mail-outline" fontSize="35px"/>
                                <Email>
                                    advertising@dataskeptic.com
                                </Email>
                            </EmailWrapper>
                        </div>
                        <div>
                            <Title> Review</Title>
                            <EmailWrapper>
                                <Icon style={{marginRight:"30px"}} icon="ios-mail-outline" fontSize="35px"/>
                                <Email>
                                    kyle@dataskeptic.com
                                </Email>
                            </EmailWrapper>
                        </div>

                    </EmailsList>
                    <FormWrapper>

                        <h2>You can also reach us via the contact form below</h2>
                        <Form onSubmit={(data) => alert(data)}
                              render={ContactForm}
                              subscription={{submitting: true, pristine: true}}
                              validate={values => contactFormValidator(values)}
                        />

                    </FormWrapper>
                </Wrapper>
            </div>
        )
    }
}
const Wrapper = styled.div`
  display:flex;
  box-sizing: border-box;
`
const EmailsList = styled.div`
  flex: 0 0 30%;
   border-right: 1px solid rgba(0, 0, 0, 0.15);
`
const FormWrapper = styled.div`
 flex: 0 0 60%;
 padding-left:60px;
 box-sizing: border-box;
`
const Email = styled.span`
  border-bottom:2px solid #f0d943;
  font-size: 22px;
`
const Title = styled.h3`
    font-size: 20px;
`
const EmailWrapper = styled.div`
     display:flex;
     align-items: center;
`
