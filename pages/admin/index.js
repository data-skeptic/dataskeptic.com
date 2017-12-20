import React, { Component } from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
import styled from "styled-components";
import AdminPage from "../../hoc/AdminPage";
import Container from "../../components/Container"

@AdminPage
export default class Admin extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={`Admin Area`}>
         Admin Area
      </Container>
    );
  }
}