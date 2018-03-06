import React from "react"
import styled from "styled-components"
import { Link } from "react-router"

const DEFAULT_CONTRIBUTION = "Author"

const Bio = ({ bio }) => <Text dangerouslySetInnerHTML={{ __html: bio }} />

const formatLink = id => `/contributors/${id}`

const renderTwitter = twitter => (
  <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
)
const renderLinkedin = linkedin => <a href={linkedin}>LinkedIn</a>

export const BlogAuthorBottom = ({
  author,
  prettyname,
  img,
  bio,
  twitter,
  linkedin,
  contribution = DEFAULT_CONTRIBUTION
}) => (
  <Container>
    <AuthorBox>
      <Photo>
        <Link to={formatLink(author)}>
          <img src={img} alt={prettyname} />
        </Link>
      </Photo>
      <About>
        <Author>
          <Contribution to={formatLink(author)}>{contribution}</Contribution>
          <Name to={formatLink(author)}>{prettyname}</Name>
        </Author>

        <Bio bio={bio} />
      </About>
    </AuthorBox>
    <Links>
      {twitter && (
        <ItemLink line={true}>
          <Category>Twitter</Category>
          <Value>{renderTwitter(twitter)}</Value>
        </ItemLink>
      )}
      {linkedin && (
        <ItemLink>
          <Category>Linkedin</Category>
          <Value>{renderLinkedin(linkedin)}</Value>
        </ItemLink>
      )}
    </Links>
  </Container>
)

export const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;

  @media (max-width: 414px) {
    margin-bottom: 0px;
  }
`

export const AuthorBox = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: row;

  @media (max-width: 414px) {
    flex-direction: column;
    padding: 24px 20px;
  }
`

const Photo = styled.div`
  width: 230px;
  padding-right: 30px;

  img {
    width: 100%;
  }
`

const About = styled.div`
  flex: 1;
`

const Author = styled.div`
  padding-bottom: 12px;
`

const Contribution = styled(Link)`
  font-size: 18px;
  line-height: 20px;
  color: #7d8080;
  display: block;
  
  &:hover {
    color: #7d8080;
  }
`

const Name = styled(Link)`
  font-size: 32px;
  line-height: 40px;
  color: #3a3b3b;
  display: block;
`

const Text = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #575959;
`

const Links = styled.div`
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: columns;
  align-items: center;
  min-height: 102px;
`

const ItemLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  ${props => props.line && `border-right: 1px solid #eee;`};
`

const Category = styled.div`
  font-weight: bold;
  font-size: 80%;
  text-transform: uppercase;
`

const Value = styled.div``

export default BlogAuthorBottom
