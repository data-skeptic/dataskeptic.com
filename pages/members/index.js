import React, { Component } from "react";
import styled from "styled-components";
import Page from "../../hoc/Page";
import Container from "../../components/Container"
import Memberships from '../../modules/Members/Containers/Memberships'
import {MEMBERSHIPS} from "../../modules/Helpers/Contants";

@Page
export default class Membership extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState();
    const promises = [];

    await Promise.all(promises);
  }

  render() {
    return (
      <Container title={"Membership"}>

          <Title>Data Skeptic Membership</Title>
          <Text>Are you a corporation or group? Contact <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a> regarding opportunties to partner with Data Skeptic.</Text>
          <Text>Your membership supports Data Skeptic's ability to continue delivering quality content on a weekly basis and expand into new mediums. For $1 per episode, your contributions can help us launch more projects and continuously improve the content of the podcast.</Text>
          <Text>We have some surprise members only perks planned for 2017. Sign up now so you don't miss out. If you'd like, you can play lights out on this site.</Text>


          <SubTitle>Donations</SubTitle>
          <Text>If you prefer to make a one time contribution, you can do so via the Paypal button below.</Text>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="3FNHXLXMGRGFY" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
              <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>

          <Memberships list={MEMBERSHIPS}/>
      </Container>
    );
  }
}

const Title = styled.h1`
`

const SubTitle = styled.h3`
`

const Text = styled.p`
`