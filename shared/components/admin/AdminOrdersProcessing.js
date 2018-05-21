import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../../Common/Components/Loading'
import OrderProcessing from './OrderProcessing'
import page from '../../Layout/hoc/page'
import {isEmtpy} from 'lodash'

class AdminOrdersProcessing extends Component {
  render() {
    const oadmin = this.props.admin.toJS()
    var order = oadmin.order
    if (isEmtpy(order)) {
      return <Loading />
    }

    return <OrderProcessing admin={this.props.admin} />
  }
}
export default page(
  connect(state => ({
    admin: state.admin
  }))(AdminOrdersProcessing),
  {
    title: 'Admin Orders Processing'
  }
)
