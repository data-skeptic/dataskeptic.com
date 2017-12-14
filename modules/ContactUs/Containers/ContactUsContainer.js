import React, {Component} from 'react'
import Icon from 'react-ionicons'
import styled from 'styled-components'
import {Form} from 'react-final-form'
import {contactFormValidator} from "../../Forms/Validators";
import ContactForm from '../../Forms/ContactForm'
import SlackForm from "../Components/SlackForm";

export default class ContactUsContainer extends Component {
    render() {
        return (
            <div>
                <PromoText>
                    We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our
                    queue to explode. We prioritize responses to Data Skeptic members first, and to those who ask
                    questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack.
                    Many people can benefit from responses in public places.
                </PromoText>
                <Wrapper>
                    <EmailsList>
                        <h2>Contact Us via Email</h2>
                        <div>
                            <Title>Purchase</Title>
                            <EmailWrapper>
                                <Icon style={{marginRight: "15px"}} icon="ios-mail-outline" fontSize="35px"/>
                                <Email href={`mailto:orders@dataskeptic.com`}>
                                    orders@dataskeptic.com
                                </Email>
                            </EmailWrapper>
                        </div>
                        <div>
                            <Title>Advertising</Title>
                            <EmailWrapper>
                                <Icon style={{marginRight: "15px"}} icon="ios-mail-outline" fontSize="35px"/>
                                <Email href={`mailto:advertising@dataskeptic.com`}>
                                    advertising@dataskeptic.com
                                </Email>
                            </EmailWrapper>
                        </div>
                        <div>
                            <Title> Review</Title>
                            <EmailWrapper>
                                <Icon style={{marginRight: "15px"}} icon="ios-mail-outline" fontSize="35px"/>
                                <Email href={`mailto:kyle@dataskeptic.com`}>
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
                <Slack>
                    <SlackTitle>To join our Slack channel, enter your email in the box below.</SlackTitle>
                    <Form onSubmit={(data) => alert(data)}
                          render={SlackForm}
                          subscription={{submitting: true, pristine: true}}
                    />
                </Slack>
                <Social>
                    <a href="https://www.facebook.com/dataskeptic">
                        <Icon color='#3a559f' icon="logo-facebook" fontSize="50px"/>
                    </a>
                    <a href="https://twitter.com/dataskeptic">
                        <Icon color="#50abf1" style={{margin: "0 60px"}} icon="logo-twitter" fontSize="50px"/>
                    </a>
                    <Icon color='#0084b1' icon="logo-linkedin" fontSize="50px"/>
                </Social>
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
const Email = styled.a`
  border-bottom:2px solid #f0d943;
  font-size: 22px;
  text-decoration: none;
    color: #000;
`
const Title = styled.h3`
    font-size: 20px;
    margin-bottom:14px;
`
const EmailWrapper = styled.div`
     display:flex;
     align-items: center;
`
const PromoText = styled.p`
 margin:20px 0;
 max-width: 992px;
  color: rgba(0, 0, 0, 0.8);
`
const Slack = styled.div`
    margin-top:100px;
    text-align: center;
`
const SlackTitle = styled.h3`
  margin-bottom: 36px;
  text-align: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
`
const Social = styled.div`
  margin-top:65px;
  text-align: center;
`