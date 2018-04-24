import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment/moment'
import { Link } from 'react-router'
import AuthorLink from '../../../components/AuthorLink'
import SlideCarousel from '../../../Common/Components/SlideCarousel'
import { connect } from 'react-redux'

const renderAuthor = ({
  author,
  img,
  prettyname,
  contribution,
  contributor_id
}) => (
  <Author>
    <Avatar src={img} />
    <Details>
      <Name>{prettyname}</Name>
      {contribution && <Contribution>{contribution}</Contribution>}
    </Details>
  </Author>
)

class BlogsSlider extends Component {
  static defaultProps = {
    blogs: []
  }

  getContributor = ({ author = '' }) =>
    this.props.contributors && this.props.contributors[author.toLowerCase()]

  renderSlidOlde = (item, index) => (
    <BlogItem key={index}>
      <ItemDate>{moment(item.publish_date).format('MMMM D, Y')}</ItemDate>
      <ItemTitle>
        <Link to={href} className="no-line">
          {item.title}
        </Link>
      </ItemTitle>
      <Abstract>{item.abstract}</Abstract>
      <Authors>
        {item.contributors && item.contributors.map(renderAuthor)}
      </Authors>
    </BlogItem>
  )

  renderSlide = (item, index) => {
    let href = '/blog' + item.prettyname
    const contributor = this.getContributor(item)

    const multipleContributors =
      item.contributors && item.contributors.length > 0

    if (!multipleContributors && contributor) {
      item.contributors = [contributor]
    }

    return (
      <a className={'item'} key={index} href={href}>
        <BlogItem>
          <ItemDate>{moment(item.publish_date).format('MMMM D, Y')}</ItemDate>
          <ItemTitle>{item.title}</ItemTitle>
          <Abstract>{item.abstract}</Abstract>
          <Authors>
            {item.contributors && item.contributors.map(renderAuthor)}
          </Authors>
        </BlogItem>
      </a>
    )
  }

  render() {
    const { blogs } = this.props
    const settings = {
      showArrows: true,
      showStatus: false,
      showThumbs: false
    }

    return (
      <Wrapper>
        <Slider>
          {blogs.length > 0 && <SlideCarousel {...settings}>
            {blogs.map(this.renderSlide)}
          </SlideCarousel>}
        </Slider>
      </Wrapper>
    )
  }
}

export default connect(state => ({
  contributors: state.site.get('contributors').toJS()
}))(BlogsSlider)

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

  .item {
    text-decoration: none !important;
    border: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 400px;

    &:hover {
      border: none !important;
    }
  }
`

export const BlogItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 180px;
  width: 60%;
  background-color: #f4f4f4;
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

export const Abstract = styled.p`
  font-size: 14px;
  line-height: 24px;
  color: #575959;
  text-align: left;
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
  margin-top: 1em;

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
  width: 30px;
  height: 30px;

  padding: 2px;
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
