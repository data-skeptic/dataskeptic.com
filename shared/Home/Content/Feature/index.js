import React, { Component } from "react"
import { Link } from "react-router"
import styled from "styled-components"
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
} from "./style"

import { ArrowRight } from "../Blog/style"
import AuthorLink from "../../../components/AuthorLink"

const formatLink = prettyname => `blog${prettyname}`

class Feature extends Component {
  renderContributor = ({ contributor_id, author, img, prettyname, twitter, contribution }) => (
    <UserBox author={author} key={contributor_id}>
      <UserImgArea>
        <AuthorLink author={author} className="no-line">
          <UserImg src={img} />
        </AuthorLink>
      </UserImgArea>
      <UserDetail>
        <AuthorLink author={author}>{prettyname}</AuthorLink>
        {contribution && <Contribution>{contribution}</Contribution>}
        {twitter && <UserInfo href={`https://twitter.com/${twitter}`}>@{twitter}</UserInfo>}
      </UserDetail>
    </UserBox>
  )

  render() {
    const { feature_blog, contributor } = this.props
    let { contributors } = this.props

    const multipleContributors = contributors && contributors.length > 0

    if (!multipleContributors && contributor) {
      contributors = [contributor]
    }

    return (
      <Container>
        <LogoContainer className="col-xs-12 col-sm-12 col-md-3">
          <Link to={formatLink(feature_blog.prettyname)} className="no-line">
            <LogoImg src={feature_blog.img} />
          </Link>
        </LogoContainer>
        <DescBox className="col-xs-12 col-sm-12 col-md-9">
          <Title>feature of the week</Title>
          <SubTitle>
            <Link to={formatLink(feature_blog.prettyname)} className="no-line">
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
                {author.twitter && (
                  <UserInfo href={`https://twitter.com/${author.twitter}`}>
                    @{author.twitter}
                  </UserInfo>
                )}
              </UserDetail>
            </UserBox>
          )}
          <BlogViewMore to={formatLink(feature_blog.prettyname)}>
            View More
          </BlogViewMore>
          <Contributors>
            {contributors && contributors.map(this.renderContributor)}
          </Contributors>
        </DescBox>
      </Container>
    )
  }
}

export default Feature

const Contributors = styled.div`
   flex-direction: row;
  display: flex;
  flex-wrap: wrap;

  ${UserBox} {
    flex-basis: 40%;
    padding-top: 16px;
    margin-right: 10%;
  }
`

export const Contribution = styled.div`
  font-size: 90%;
  color: #7d8080;
`
