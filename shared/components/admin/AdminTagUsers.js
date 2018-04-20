import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import TagUsers from './TagUsers'
import { changePageTitle } from '../../Layout/Actions/LayoutActions'

class AdminTagUsers extends Component {
  static getPageMeta = () => ({
    title: 'Tag Users'
  })

  componentDidMount() {
    const { title } = AdminTagUsers.getPageMeta()
    this.props.dispatch(changePageTitle(title))
  }

  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Tag Users</h3>

        <TagUsers />
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminTagUsers)
