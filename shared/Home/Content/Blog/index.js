import React, { Component }  from 'react'
import moment from 'moment'
import {
  Container,
  Title,
  BlogItem,
  ItemDate,
  ItemTitle,
  ItemDesc,
  ViewMore,
  ArrowRight
} from './style'

const BlogBox = props => {
  const { blogList } = props
  return (
    <div>
      {
        blogList.map(
          (item, index) => {
            return (
              <BlogItem key={index}>
                <ItemDate>{moment(item.publish_date).format('MMMM D, Y')}</ItemDate>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDesc>{item.abstract}</ItemDesc>
                <ViewMore>View More</ViewMore>
                <ArrowRight />
              </BlogItem>
            )
          }
        )
      }
    </div>
  )
}

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const { blogList } = this.props
    return (
      <Container>
        <Title>From the Blog</Title>
        <BlogBox blogList={blogList} />
      </Container>
    )
  }
}

export default Blog