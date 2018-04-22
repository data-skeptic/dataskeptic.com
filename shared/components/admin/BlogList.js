import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'

import BlogListItem from '../../Blog/Components/BlogListItem'
import RelatedContent from '../../Blog/Components/RelatedContent'
import { Link } from 'react-router'

const fakeClick = e => {
  e.preventDefault()
  e.stopPropagation()
}

const normalizeDate = d => moment(d).format('YYYY-MM-DD')

class BlogList extends Component {
  getAuthor = (author = '') => this.props.contributors.get(author.toLowerCase().trim()).toJS()

  renderPreview() {
    const { blog } = this.props
    const contributor = this.getAuthor(blog.author) || {}

    return (
      <Preview>
        <BlogListItem
          blog={blog}
          contributor={contributor}
          onClick={fakeClick}
        />
        <RelatedContent items={blog.related} />
      </Preview>
    )
  }

  render() {
    const { odd, blog } = this.props
    const { blog_id, prettyname } = blog

    blog.publish_date = normalizeDate(blog.publish_date)

    return (
      <Wrapper odd={odd}>
        <Inner>
          <Heading>
            <Label>
              ID: <ID>{blog_id}</ID>
            </Label>
            <Value>
              <EditButton to={'/admin/cms/blog' + prettyname}>Edit</EditButton>
            </Value>
          </Heading>
          <Row>
            <Label>Prettyname:</Label>
            <Value>
              <input
                type="text"
                defaultValue={`https://dataskeptic.com/blog${prettyname}`}
                readOnly={true}
              />
            </Value>
          </Row>

          {this.renderPreview()}
        </Inner>
      </Wrapper>
    )
  }
}

export default connect(state => ({
  contributors: state.site.get('contributors')
}))(BlogList)

const Wrapper = styled.div`
  background: #f9faf9;
  margin-bottom: 12px;
  border: 1px solid #e1e3e2;
  display: flex;
  flex-direction: column;

  ${props =>
    props.open &&
    `
    background: rgba(240, 217, 67, 0.1);
  `};
`

const Inner = styled.div`
  padding: 20px 30px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

const Value = styled.div`
  flex: 1;

  > input {
    width: 100%;
  }
`

const Preview = styled.div``

const Heading = Row.extend`
  font-size: 24px;
  color: #2d1454;

  height: 60px;
`

const ID = styled.span`
  color: #000;
`

const EditButton = styled(Link)`
  width: 160px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  background: #f0d943;
  display: inline-block;
  border: none;
  line-height: 27px;
  text-align: center;
  color: #fff !important;

  &:hover {
    color: #fff;
    border: none;
  }
`
