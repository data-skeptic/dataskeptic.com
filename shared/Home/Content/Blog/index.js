import React, { Component }  from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import {
  Container,
  Title,
  BlogItem,
  ItemDate,
  ItemTitle,
  ItemDesc,
  ViewMore
} from './style'

const BlogBox = props => {
  const { blogList } = props
  console.log('blogList - homepage', blogList)
  return (
    <div>
      {
        blogList.map(
          (item, index) => {
            console.log('prettyname', item.prettyname)
            let href = 'blog' + item.prettyname
            return (
              <BlogItem key={index}>
                <ItemDate>{moment(item.publish_date).format('MMMM D, Y')}</ItemDate>
                <Link to={href}><ItemTitle>{item.title}</ItemTitle></Link>
                <ItemDesc>{item.abstract}</ItemDesc>
                <ViewMore to={href}>View More</ViewMore>
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