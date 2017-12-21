import React, { Component } from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
import styled from "styled-components";
import Page from "../../hoc/Page";
import Container from "../../components/Container"
@Page
export default class About extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={"About"}>
          <Inner>
            <Title>About Data Skeptic</Title>
            <p>Data Skeptic is your source for a perspective of scientific skepticism
            on topics in statistics, machine learning, big data, artificial
            intelligence, and data science. Our weekly podcast and blog bring you
            stories and tutorials to help understand our data-driven world.</p>
            <p>To reach out to the podcast, please visit our <Link href={'/contact-us'}><b>Contact Us</b></Link>  page.</p>
          </Inner>
      </Container>
    )
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