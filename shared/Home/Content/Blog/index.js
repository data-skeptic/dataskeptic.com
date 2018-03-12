import React, { Component } from "react"
import moment from "moment"
import { Link } from "react-router"
import {
  Container,
  Title,
  BlogItem,
  ItemDate,
  ItemTitle,
  ItemDesc,
  ViewMore,
  Authors,
  Author,
  Details,
  Avatar,
  Name,
  Contribution
} from "./style"

import AuthorLink from "../../../components/AuthorLink"

const renderAuthor = ({
  author,
  img,
  prettyname,
  contribution,
  contributor_id
}) => (
  <AuthorLink author={author} key={contributor_id} className="no-line">
    <Author>
      <Avatar src={img} />
      <Details>
        <Name>{prettyname}</Name>
        {contribution && <Contribution>{contribution}</Contribution>}
      </Details>
    </Author>
  </AuthorLink>
)

const BlogBox = props => {
  const { blogList, getContributor } = props
  return (
    <div>
      {blogList.map((item, index) => {
        let href = "blog" + item.prettyname
        const contributor = getContributor(item)

        const multipleContributors =
          item.contributors && item.contributors.length > 0

        if (!multipleContributors && contributor) {
          item.contributors = [contributor]
        }

        return (
          <BlogItem key={index}>
            <ItemDate>{moment(item.publish_date).format("MMMM D, Y")}</ItemDate>
            <ItemTitle><Link to={href} className="no-line">{item.title}</Link></ItemTitle>
            <ItemDesc>{item.abstract}</ItemDesc>
            <ViewMore to={href} className="no-line"><span className="pseudo no-line">View More</span></ViewMore>
            <Authors>{item.contributors && item.contributors.map(renderAuthor)}</Authors>
          </BlogItem>
        )
      })}
    </div>
  )
}

class Blog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { blogList, getContributor } = this.props
    return (
      <Container>
        <Title>From the Blog</Title>
        <BlogBox blogList={blogList} getContributor={getContributor} />
      </Container>
    )
  }
}

export default Blog
