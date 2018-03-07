import React, { Component } from "react"
import { connect } from "react-redux"
import { submit } from "redux-form"
import styled from "styled-components"
import moment from "moment"

import BlogUpdateForm, { FORM_KEY } from "./BlogUpdateForm"
import BlogRelatedForm, { INTERNAL_LINK } from "./BlogRelatedFields"

import BlogListItem from "../../Blog/Components/BlogListItem"
import RelatedContent from "../../Blog/Components/RelatedContent"

const normalizeDate = d => moment(d).format("YYYY-MM-DD")

const fakeClick = e => {
  e.preventDefault()
  e.stopPropagation()
}

class BlogUpdater extends Component {
  state = {
    edit: false
  }
  startEditing = () => this.setState({ edit: true })

  finishEditing = () => this.setState({ edit: false })

  save = async () => {
    await this.props.dispatch(submit(FORM_KEY))
  }

  saveRelated = related => {
    related = related.filter(item => !(item.created && item.remove))

    const created = related
      .filter(item => item.created)
      .map(item => this.addRelatedItem(item))

    const remove = related
      .filter(item => item.remove)
      .map(item => this.deleteRelatedItem(item))

    return Promise.all(created.concat(remove))
  }

  onSave = async data => {
    const {
      blog_id,
      title,
      abstract,
      author,
      publish_date,
      related = []
    } = data

    const { dispatch } = this.props

    const blogRelated = related.map(item => ({
      ...item,
      blog_id,
      source: blog_id
    }))

    return this.saveRelated(blogRelated)
      .then(() =>
        dispatch({
          type: "CMS_UPDATE_BLOG",
          payload: {
            blog_id,
            title,
            abstract,
            author,
            publish_date,
            dispatch
          }
        })
      )
      .then(() => this.finishEditing())
  }

  onRelatedUpdate = data => {
    debugger
  }

  delete = () => {
    const { dispatch, blog: { blog_id } } = this.props

    dispatch({ type: "CMS_DELETE_BLOG", payload: { blog_id, dispatch } })
  }

  addRelatedItem = data => {
    const { dispatch } = this.props

    dispatch({
      type: "RELATED_CONTENT_ADD",
      payload: { data, dispatch }
    })
  }

  deleteRelatedItem = ({ content_id }) => {
    return this.props.dispatch({
      type: "RELATED_CONTENT_DELETE",
      payload: { content_id }
    })
  }

  getAuthor = (author = "") =>
    this.props.contributors.filter(
      contributor =>
        contributor
          .get("author")
          .toLowerCase()
          .trim() === author.toLowerCase().trim()
    )[0]

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
    const { edit } = this.state
    const { odd, blog } = this.props
    const { blog_id, prettyname, related = [] } = blog

    blog.publish_date = normalizeDate(blog.publish_date)

    const blogFormData = {
      ...blog,
      related: related.map(item => {
        if (item.type === INTERNAL_LINK) {
          item.dest = {
            blog_id: item.blog_id,
            title: item.title
          }
        }
        return item
      })
    }

    return (
      <Wrapper odd={odd}>
        <Inner>
          <Heading>
            <Label>
              ID: <ID>{blog_id}</ID>
            </Label>
            <Value>
              {!edit ? (
                <EditButton onClick={this.startEditing}>Edit</EditButton>
              ) : (
                <CancelButton onClick={this.finishEditing}>
                  <span>Cancel</span>
                </CancelButton>
              )}
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

          {edit ? (
            <Editing>
              <code>{JSON.stringify(blogFormData)}</code>
              <BlogForm
                onSubmit={this.onSave}
                showSubmit={false}
                allowSubmit={true}
                submitValue={"Add"}
                initialValues={blogFormData}
              />

              <Buttons>
                <CancelButton onClick={this.finishEditing}>
                  <span>Cancel</span>
                </CancelButton>
                <DeleteButton onClick={this.delete}>Delete</DeleteButton>
                <SaveButton onClick={this.save}>Save</SaveButton>
              </Buttons>
            </Editing>
          ) : (
            this.renderPreview()
          )}
        </Inner>
      </Wrapper>
    )
  }
}

export default connect(state => ({
  contributors: state.site.get("contributors")
}))(BlogUpdater)

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

const Editing = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    min-height: 100px;
  }
`

const Preview = styled.div``

const RelatedList = styled.div``
const RelatedItem = styled.div``

const BlogForm = styled(BlogUpdateForm)`
  display: flex;
  flex-direction: column;
`

const Heading = Row.extend`
  font-size: 24px;
  color: #2d1454;

  height: 60px;
`

const ID = styled.span`
  color: #000;
`

const Buttons = Row.extend`
  justify-content: flex-end;
`

const ActionButton = styled.button`
  width: 160px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
`

const EditButton = ActionButton.extend`
  margin-left: 10px;
  background: #f0d943;
  display: inline-block;
  height: 27px;
`

const CancelButton = ActionButton.extend`
  background: transparent;
  margin-right: 12px;

  span {
    color: #333;
    border-bottom: 1px dotted;
  }
`

const SaveButton = ActionButton.extend`
  background: #2ecb70;
`

const DeleteButton = ActionButton.extend`
  margin-right: 12px;
  background: #e74c3c;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

const Details = styled.div`
  padding-top: 60px;
`

const ShowRelatedButton = styled.button`
  display: flex;
  height: 50px;
  justify-content: center;
  border: none;
`
