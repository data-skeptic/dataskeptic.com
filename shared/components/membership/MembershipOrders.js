import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loading from '../../Common/Components/Loading'
import page from '../../Layout/hoc/page'
import MembershipHeader from './MembershipHeader'
import axios from 'axios'
import { get_products } from '../../utils/redux_loader'
import OrderCard from './OrderCard'

class MembershipOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  componentDidMount() {
    const { dispatch, store } = this.props;
    if (!store.products_loaded) get_products(dispatch);
    this.getOrders();
  }
  async getOrders() {
    const { user } = this.props;
    const { data } = await axios.get('/api/v1/orders');
    const orders = data.orders[1] //.filter(_order => _order.email);
    this.setState({ orders });
  }

  render() {
    const { user, store } = this.props;
    const { products } = store;
    const { orders } = this.state;
    return (
      <Container>
        <MembershipHeader user={user} />
        <PageTitle>My Orders</PageTitle>
        {orders.map((_order, _o) => <OrderCard key={_o} order={_order} products={products} />)}
      </Container>
    )
  }
}

export default page(
  connect(state => ({
    store: state.products.toJS(),
    user: state.auth.getIn(['user']).toJS(),
  }))(MembershipOrders),
  {
    title: `Membership Orders`
  }
)

const Container = styled.div`
  margin: 25px auto;
  clear: both;
  max-width: 675px;
`

const PageTitle = styled.h4`
  font-size: 32px;
  line-height: 40px;
  color: #3a3b3b;
  display: block;
  padding-bottom: 8px;
`