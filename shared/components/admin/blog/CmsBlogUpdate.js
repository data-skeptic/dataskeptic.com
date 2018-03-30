import React, { Component } from 'react'
import BlogUpdateForm, { FORM_KEY } from './BlogForm'
import { INTERNAL_LINK } from './BlogRelatedFields'

import styled from 'styled-components'
import { connect } from 'react-redux'
import { getBlog } from '../../../reducers/CmsReducer'
import { submit } from 'redux-form'
import moment from 'moment/moment'
import Loading from '../../../Common/Components/Loading'

const normalizeDate = d => moment(d).format('YYYY-MM-DD')

const formatRelated = item => {
  const {
    dest = '',
    source = '',
    title = '',
    body = '',
    content_id,
    blog_id2,
    blog_id,
    type
  } = item

  return { dest, source, title, body, content_id, blog_id2, blog_id, type }
}

class CmsBlogUpdate extends Component {
  cancel = () => {
    console.log('123')
  }

  save = async () => {
    await this.props.dispatch(submit(FORM_KEY))
  }

  saveRelated = related => {
    // manage new related
    const created = related
      .filter(item => item.created)
      .map(item => this.addRelatedItem(item))

    // remove old related
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

    return this.saveRelated(blogRelated).then(() =>
      dispatch({
        type: 'CMS_UPDATE_BLOG',
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
  }

  delete = () => {
    const { dispatch, blog: { blog_id } } = this.props

    dispatch({ type: 'CMS_DELETE_BLOG', payload: { blog_id, dispatch } })
  }

  addRelatedItem = data => {
    const { dispatch } = this.props
    data = formatRelated(data)

    dispatch({
      type: 'RELATED_CONTENT_ADD',
      payload: { data, dispatch }
    })
  }

  deleteRelatedItem = ({ content_id }) => {
    return this.props.dispatch({
      type: 'RELATED_CONTENT_DELETE',
      payload: { content_id }
    })
  }

  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch({ type: 'CMS_LOAD_PENDING_BLOGS', payload: { dispatch } })

    const limit = 20
    const offset = 0
    const prefix = ''
    const payload = { limit, offset, prefix, dispatch }
    dispatch({ type: 'CMS_LOAD_RECENT_BLOGS', payload })
  }

  renderNotFound() {
    return <div>Not found.</div>
  }

  render() {
    const { blog, loaded } = this.props

    if (!loaded) {
      return <Loading />
    }

    if (!blog) {
      return this.renderNotFound()
    }

    const { related = [] } = blog

    const blogFormData = {
      ...blog,
      publish_date: normalizeDate(blog.publish_date),
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
      <Container>
        <BlogForm
          onSubmit={this.onSave}
          showSubmit={false}
          allowSubmit={true}
          submitValue={'Add'}
          initialValues={blogFormData}
        />

        <Buttons>
          <CancelButton onClick={this.cancel}>
            <span>Cancel</span>
          </CancelButton>
          <DeleteButton onClick={this.delete}>Delete</DeleteButton>
          <SaveButton onClick={this.save}>Save</SaveButton>
        </Buttons>
      </Container>
    )
  }
}

export default connect((state, ownProps) => ({
  admin: state.admin,
  blog: getBlog(state, ownProps.prettyname),
  loaded:
    state.cms.get('recent_blogs_loaded') &&
    state.cms.get('pending_blogs_loaded')
}))(CmsBlogUpdate)

const Container = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    min-height: 100px;
  }
`
const BlogForm = styled(BlogUpdateForm)`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  
`

const Buttons = Row.extend`
  justify-content: flex-end;
`

const ActionButton = styled.button`
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 5px;
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
