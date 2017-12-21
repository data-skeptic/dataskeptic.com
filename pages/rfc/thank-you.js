import React, { Component } from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
import styled from "styled-components";
import MemberPage from "../../hoc/MemberPage";
import Container from "../../components/Container"

@MemberPage
export default class RFCSuccess extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={"Thank you"}>
          <Inner>
            <Title>Thank you.</Title>
          </Inner>
      </Container>
    )
  }
}

const Title = styled.h1`
  
`

const Inner = styled.h1`
    max-width: 800px;
    margin: 0px auto;
    margin-top: 20px;
    flex-grow: 1;
    
    font-size: 15px;
`