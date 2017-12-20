import React, { Component } from "react";
import MemberPage from "../../hoc/MemberPage";
import Container from "../../components/Container"
import Profile from '../../modules/Members/Containers/Profile'

@MemberPage
export default class Account extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={`Account`}>
          <Profile />
      </Container>
    );
  }
}
