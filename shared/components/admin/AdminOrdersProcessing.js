import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import Loading from '../../Common/Components/Loading'
import OrderProcessing from './OrderProcessing'

class AdminOrdersProcessing extends Component {
  render() {
    const { history } = this.props
    const oadmin = this.props.admin.toJS()
    var order = oadmin.order
    if (order == undefined) {
      return <Loading />
    }

    return (
      <AdminLayout history={history}>
        <OrderProcessing admin={this.props.admin} />
      </AdminLayout>
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminOrdersProcessing)
