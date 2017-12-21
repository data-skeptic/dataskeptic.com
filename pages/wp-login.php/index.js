import React, { Component } from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
import styled from "styled-components";
import Page from "../../hoc/Page";
import Container from "../../components/Container"
@Page
export default class WPLogin extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={"This is not a wordpress site"}>
          <Inner>
            <Title>This is not a wordpress site</Title>
            <p>It appears you're trying to access the administration section of a wordpress site. DataSkeptic.com is not based on wordpress. If you want to understand more about our site, please check out our corresponding github repository.</p>
            <p>Since you were looking for the admin page, I'm guessing you're interested in helping us test our security. Please use our contact us form to find out about more productive ways you can help. Thanks!</p>
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