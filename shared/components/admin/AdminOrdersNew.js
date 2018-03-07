import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import OpenOrders from './OpenOrders'
import Loading from '../../Common/Components/Loading'

class AdminOrdersNew extends Component {
  redirect = to => this.props.history.push(to)

  render() {
    const { history } = this.props
    const oadmin = this.props.admin.toJS()
    var order = oadmin.order
    if (order == undefined) {
      return <Loading />
    }
    var step = order.step
    var errorMsg = order.errorMsg

    return (
      <AdminLayout history={history}>
        <h3>Orders [NEW]</h3>

        <hr />
        {step}
        {errorMsg}
        <hr />

        <OpenOrders redirect={this.redirect} />
      </AdminLayout>
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminOrdersNew)
