import React, { Component }  from 'react'
import { Link } from 'react-router'
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
  UserInfo,
  BlogViewMore,
  UserImgLink
} from './style'

import { ArrowRight } from '../Blog/style'

const DescText = 'The second day of NIPS kicked off with this presentation from Brendan Frey. In the first minute, he put forward the bold claim "without artificial intelligence medicine is going to completely fail". The presentation was support for that idea.'

class Feature extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { feature_blog } = this.props
    var href = 'blog' + feature_blog.prettyname
    return (
      <Container>
        <LogoContainer className="col-xs-12 col-sm-12 col-md-3">
          <Link to={href}><LogoImg src={feature_blog.img} /></Link>
        </LogoContainer >
        <DescBox className="col-xs-12 col-sm-12 col-md-9">
          <Title>feature of the week</Title>
            <Link to={href}><SubTitle>{feature_blog.title}</SubTitle></Link>
            <Desc>{feature_blog.abstract}</Desc>
            <BlogViewMore to={href}>View More</BlogViewMore>
            <ArrowRight />
          <UserBox>
            <UserImgLink href="https://twitter.com/dataskeptic"><UserImg src="/img/png/kyle-polich.png" /></UserImgLink>
            <UserDetail>
              <UserInfo href="https://twitter.com/dataskeptic">{feature_blog.author}</UserInfo>
            </UserDetail>
          </UserBox>
        </DescBox>
      </Container>
    )
  }
}

export default Feature