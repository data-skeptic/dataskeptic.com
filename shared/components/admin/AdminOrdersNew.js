import React, { Component} from 'react'
import { connect } from 'react-redux'
import OpenOrders from './OpenOrders'
import Loading from '../../Common/Components/Loading'
import {isEmpty} from 'lodash'
import page from "../../Layout/hoc/page";

class AdminOrdersNew extends Component {
  redirect = to => this.props.router.push(to)

  render() {
    const oadmin = this.props.admin.toJS()
    const order = oadmin.order
    if (isEmpty(order)) {
      return <Loading />
    }
    const step = order.step
    const errorMsg = order.errorMsg

    return (
      <div>
        <h3>Orders [NEW]</h3>

        <hr />
        {step}
        {errorMsg}
        <hr />

        <OpenOrders redirect={this.redirect} />
      </div>
    )
  }
}
export default page(connect(state => ({
  admin: state.admin
}))(AdminOrdersNew), {
  
})
