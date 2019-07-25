import React, { Component } from 'react';
import styled from 'styled-components'

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: !!props.open
    };
  }
  handleEvent(eventName, eventData = {}) {
    switch(eventName) {
      case 'onClick': {
        return event => {
          this.setState({ isOpen: !isOpen });
        };
      }
      default: {}
    }
  }
  render() {
    const { order } = this.props;
    const { isOpen } = this.state;
    return (
      <OrderWrapper>
        {(order.items || []).filter((_item, _i) => _item.type === 'sku').map((_item, _i) => (
          <OrderItem key={_i}>
            <ItemName>{_item.description}</ItemName>
            <ItemQuantity>x {_item.quantity}</ItemQuantity>
            <ItemPrice>${parseFloat(_item.amount/100).toFixed(2)}</ItemPrice>
          </OrderItem>
        ))}
        {(order.items || []).filter((_item, _i) => _item.type === 'shipping').map((_item, _i) => (
          <OrderItem key={_i}>
            <ItemLabel>{_item.description}</ItemLabel>
            <ItemPrice>${parseFloat(_item.amount/100).toFixed(2)}</ItemPrice>
          </OrderItem>
        ))}
        <OrderItem>
          <ItemLabel>Total</ItemLabel>
          <ItemPrice>${parseFloat(order.amount/100).toFixed(2)}</ItemPrice>
        </OrderItem>
        <AddressContainer>
          <AddressLabel>Name</AddressLabel><AddressValue>{order.shipping.name}</AddressValue>
          <AddressLabel>Street</AddressLabel><AddressValue>{order.shipping.address.line1}</AddressValue>
          <AddressLabel>Suite</AddressLabel><AddressValue>{order.shipping.address.line2}</AddressValue>
          <AddressLabel>City</AddressLabel><AddressValue>{order.shipping.address.city}</AddressValue>
          <AddressLabel>State</AddressLabel><AddressValue>{order.shipping.address.state}</AddressValue>
          <AddressLabel>Postal Code</AddressLabel><AddressValue>{order.shipping.address.postal_code}</AddressValue>
        </AddressContainer>
        {/* {order && order.shipping && (
          <ItemDrawer onClick={this.handleEvent('onClick')}>
            {isOpen
              && <React.Fragment><sup>More Info</sup><i className="fa fa-chevron-down" /></React.Fragment>
              || <React.Fragment><sup>Less Info</sup><i className="fa fa-chevron-up" /></React.Fragment>
            }
          </ItemDrawer>
        )} */}
      </OrderWrapper>
    );
  }
};

const OrderWrapper = styled.div`
  width:100%;
  border:1px solid #948c76;
  padding:15px;
  margin:15px 0;
`;

const OrderItem = styled.h3`
  width:100%;
  margin:5px 0;
`;

const ItemName = styled.span`
  display:inline-block;
  width:60%;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
`;

const ItemQuantity = styled.span`
  display:inline-block;
  width:20%;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  text-align: right;
`;

const ItemPrice = styled.span`
  display:inline-block;
  width:20%;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  text-align: right;
`;

const ItemLabel = styled.span`
  display:inline-block;
  width:80%;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  text-align: right;
  font-style: italic;
  padding-right: 0.15em;
  text-transform: capitalize;
`;

const ItemDrawer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  text-align: center;
  font-size: 1em;
  transform: translateY(10px);
  cursor: pointer;
`;

const AddressContainer = styled.div`
  width: 100%;
  margin: 5px 0;
`;

const AddressLabel = styled.span`
  display: inline-block;
  width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
  font-weight: 700;
  padding: 5px 10px 0 10px;
`;

const AddressValue = styled.span`
  display: inline-block;
  width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 5px 10px 0 10px;
`;

export default OrderCard;