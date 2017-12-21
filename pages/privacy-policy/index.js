import React, { Component } from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
import styled from "styled-components";
import Page from "../../hoc/Page";
import Container from "../../components/Container"
@Page
export default class Privacy extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={"Privacy Policy"}>
          <Inner>
              <Title>Privacy Policy</Title>
              <p>Welcome to our informal privacy policy. If you'd like any clarification, please email <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a> directly.</p>
              <p>We track users with basic Google Analytics. In this regard, their privacy policy is our privacy policy.</p>
              <p>Our mailing list is managed through Mailchimp. Although we may include advertisements in our correspondence from time to time, nothing except default Mailchimp tracking occurs and we never sell or expose email addresses to anyone ever.</p>
              <p>We track audio player usage on our site. If you listen to the podcast at dataskeptic.com, we monitor pausing, skipping ahead, etc. This is done using an anonymous ID which is not linked anywhere else. Our objective here is to measure the way people listen to the show. Do they skip ahead? Do they drop off?</p>
              <p>Data collected related to Membership and Merch purchases are maintained but will not be sold or exposed to any 3rd parties. Credit card data is neither retained or directly collected. Our store works with PayPal and Stripe, so we never actually see your credit card number.</p>
          </Inner>
      </Container>
    );
  }
}

const Title = styled.h1`

`

const Inner = styled.div`
    max-width: 800px;
    margin: 0px auto;
    margin-top: 20px;
    flex-grow: 1;
    
    font-size: 15px;
`