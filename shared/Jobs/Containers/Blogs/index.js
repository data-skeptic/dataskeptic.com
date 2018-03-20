import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Slick from 'react-slick'
import moment from 'moment/moment'
import { Link } from 'react-router'
import AuthorLink from '../../../components/AuthorLink'

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

export default class BlogsSlider extends Component {
  static defaultProps = {
    blogs: []
  }

  renderSlide = (item, index) => (
    <BlogItem key={index}>
      <ItemDate>{moment(item.publish_date).format('MMMM D, Y')}</ItemDate>
      <ItemTitle>
        <Link to={href} className="no-line">
          {item.title}
        </Link>
      </ItemTitle>
      <ItemDesc>{item.abstract}</ItemDesc>
      <Authors>
        {item.contributors && item.contributors.map(renderAuthor)}
      </Authors>
    </BlogItem>
  )

  render() {
    const { blogs } = this.props
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <Wrapper>
        <Slider>
          <Slick {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slick>
        </Slider>

        {/*{blogs.length > 0 && (*/}
        {/*<Slider {...settings}>{blogs.map(this.renderSlide)}</Slider>*/}
        {/*)}*/}
      </Wrapper>
    )
  }
}

const slider = css``

export const Wrapper = styled.div`
  position: relative;
  position: relative;
  display: block;
  width: 610px;
`

const Slider = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const BlogItem = styled.div`
  padding-top: 28px;
`

export const Title = styled.div`
  color: #2d1454;
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
  text-transform: uppercase;
`

export const ItemDate = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: #7d8080;
  display: block;
  padding-bottom: 8px;
`

export const ItemTitle = styled.span`
  font-size: 32px;
  line-height: 40px;
  color: #3a3b3b;
  display: block;
  padding-bottom: 8px;
`

export const ItemDesc = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: #575959;
`

export const ViewMore = styled(Link)`
  display: inline-block;
  font-size: 14px;
  color: #000;
  line-height: 17px;
  margin-left: 5px;
  margin-right: 3px;
  border: 0;
  background: transparent;
  position: relative;
  padding-right: 20px;

  :before,
  :after {
    border-right: 2px solid;
    content: '';
    display: block;
    height: 8px;
    margin-top: -6px;
    position: absolute;
    transform: rotate(135deg);
    right: 10px;
    top: 50%;
    width: 0;
  }

  :after {
    margin-top: -1px;
    transform: rotate(45deg);
  }
`

export const Authors = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;

  > a {
    flex-basis: 40%;
    padding-top: 16px;
    margin-right: 10%;
  }

  @media (max-width: 414px) {
    flex-direction: column;

    > a {
      flex-basis: 100%;
      margin-right: 0px;
    }
  }
`

export const Author = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`

export const Avatar = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;

  padding: 4px;
  background-color: #ffffff;
  border: 1px solid #dddddd !important;
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
`

export const Name = styled.span``

export const Contribution = styled.span`
  font-size: 90%;
  color: #7d8080;
`
