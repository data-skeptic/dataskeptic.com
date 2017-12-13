import React, { Component } from "react";
import styled from "styled-components";
import Ionicon from 'react-ionicons'
export default class CartItem extends Component {
  handleChange = amount => {
    const { id, quantity } = this.props;
    if (quantity + amount) {
      this.props.changeQuantity(id, quantity + amount);
    } else {
      this.handleRemove();
    }
  };
  handleRemove = () => {
    const { id } = this.props;
    this.props.removeItem(id);
  };

  render() {
    const { id, title, img, quantity, price } = this.props;
    return (
      <Wrapper>
        <Image>
          <img src={img} alt="" />
        </Image>
        <Info>
          <Row>
            <Name>
              {title}
            </Name>
            <div onClick={this.handleRemove}><Ionicon color="#3a3b3b" icon="md-close"/></div>
          </Row>
          <Separator/>
          <Row>
            <QuantityWrapper>
              <Button onClick={() => this.handleChange(1)}><Ionicon  fontSize="12px" color={"#3a3b3b"} icon={"md-add"}/></Button>
              <Quantity>
                {quantity}
              </Quantity>
              <Button onClick={() => this.handleChange(-1)}><Ionicon  fontSize="12px" color="#3a3b3b" icon="md-remove"/></Button>
            </QuantityWrapper>
            <span>
              ${(price * quantity).toFixed(2)}
            </span>
          </Row>
        </Info>
      </Wrapper>
    );
  }
}

const Name = styled.div``;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.dark};
`;
const Separator = styled.div`
  height: 20px;
`
const Button = styled.button`
  width: 25px;
  padding: 0;
  height: 25px;
  border: none;
  transition: 0.1s all;
    color: ${props => props.theme.colors.dark}
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  &:focus {
    outline: none;
  }
  &:first-child {
    border-right: 1px solid ${props => props.theme.colors.primary};
  }
  &:last-child {
    border-left: 1px solid ${props => props.theme.colors.primary};
  }
`;
const Quantity = styled.span`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  user-select: none;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.light}
  padding: 20px 0px;
    color: ${props => props.theme.colors.dark}
`;
const Image = styled.div`
  margin-right: 20px;

  & > img {
    height: 80px;
  }
`;

const Price = styled.div`flex-basis: 10%;`;

const Info = styled.div`
  flex-grow: 1;

  flex-basis: 90%;
`;
