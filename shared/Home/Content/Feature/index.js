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
  UserImgArea
} from './style'

import { ArrowRight } from '../Blog/style'
import AuthorLink from "../../../components/AuthorLink";

class Feature extends Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    const { feature_blog, author } = this.props
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
          { author &&
            <AuthorLink author={author.author}>
              <UserBox author={author.author}>
                <UserImgArea><UserImg src={author.img} /></UserImgArea>
                <UserDetail>
                  <UserInfo>{author.prettyname}</UserInfo>
                  <UserInfo>@{author.twitter}</UserInfo>
                </UserDetail>
              </UserBox>
            </AuthorLink>
          }
        </DescBox>
      </Container>
    )
  }
}

export default Feature