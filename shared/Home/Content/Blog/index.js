import React, { Component }  from 'react'
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

const BlogList = [
  {
    date: 'November 18, 2016',
    title: 'Relaunching DataSkeptic.com',
    desc: 'Financial analysis techniques for studying numeric, well structured data are very mature. While using unstructured data in finance is not necessarily a new idea, the area is still very greenfield. On this episode, Delia Rusu shares her thoughts on the potential'
  },
  {
    date: 'November 18, 2016',
    title: 'Relaunching DataSkeptic.com',
    desc: 'Financial analysis techniques for studying numeric, well structured data are very mature. While using unstructured data in finance is not necessarily a new idea, the area is still very greenfield. On this episode, Delia Rusu shares her thoughts on the potential'
  }
]

const BlogBox = props => {
  const { blogList } = props
  console.log('blogList', blogList)
  return (
    <div>
      {
        blogList.map(
          (item, index) => {
            return (
              <BlogItem key={index}>
                <ItemDate>{item.date}</ItemDate>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDesc>{item.desc}</ItemDesc>
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
    return (
      <Container>
        <Title>From the Blog</Title>
        <BlogBox blogList={BlogList} />
      </Container>
    )
  }
}

export default Blog