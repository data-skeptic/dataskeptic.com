import React, { Component }  from 'react'
import {
  Container,
  LogoContainer,
  LogoImg,
  DescBox,
  Title,
  SubTitle,
  Desc,
  UserBox,
  UserImg,
  UserDetail,
  UserInfo
} from './style'

const DescText = 'The second day of NIPS kicked off with this presentation from Brendan Frey. In the first minute, he put forward the bold claim "without artificial intelligence medicine is going to completely fail". The presentation was support for that idea.'

class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <Container>
        <LogoContainer className="col-xs-12 col-sm-12 col-md-3">
          <LogoImg src="/img/png/bitmap.png" />
        </LogoContainer >
        <DescBox className="col-xs-12 col-sm-12 col-md-9">
          <Title>feature of the week</Title>
          <SubTitle>Reprogramming the Human Genome Using AI</SubTitle>
          <Desc>{DescText}</Desc>
          <UserBox>
            <UserImg src="/img/png/kyle-polich.png" />
            <UserDetail>
              <UserInfo>Kyle Polich</UserInfo>
              <UserInfo>@dataskeptic</UserInfo>
            </UserDetail>
          </UserBox>
        </DescBox>
      </Container>
    )
  }
}

export default Feature