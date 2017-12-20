import React, { Component } from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
import styled from "styled-components";
import Page from "../../hoc/Page";
import Container from "../../components/Container"

@Page
export default class Contact extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={`Contact`}>
          Contact
      </Container>
    );
  }
}