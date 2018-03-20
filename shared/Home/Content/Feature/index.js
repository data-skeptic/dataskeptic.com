import React, { Component } from 'react'
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
  UserImgArea
} from './style'

import { ArrowRight } from '../Blog/style'
import AuthorLink from '../../../components/AuthorLink'

class Feature extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { feature_blog, author } = this.props
    var href = 'blog' + feature_blog.prettyname
    return (
      <Container>
        <LogoContainer className="col-xs-12 col-sm-12 col-md-3">
          <Link to={href} className="no-line">
            <LogoImg src={feature_blog.img} />
          </Link>
        </LogoContainer>
        <DescBox className="col-xs-12 col-sm-12 col-md-9">
          <Title>feature of the week</Title>
          <SubTitle>
            <Link to={href} className="no-line">
              {feature_blog.title}
            </Link>
          </SubTitle>
          <Desc>{feature_blog.abstract}</Desc>
          <BlogViewMore to={href}>View More</BlogViewMore>
          {author && (
            <UserBox author={author.author}>
              <UserImgArea>
                <AuthorLink author={author.author} className="no-line">
                  <UserImg src={author.img} />
                </AuthorLink>
              </UserImgArea>
              <UserDetail>
                <AuthorLink author={author.author}>
                  {author.prettyname}
                </AuthorLink>
                <UserInfo href={`https://twitter.com/${author.twitter}`}>
                  @{author.twitter}
                </UserInfo>
              </UserDetail>
            </UserBox>
          )}
        </DescBox>
      </Container>
    )
  }
}

export default Feature
