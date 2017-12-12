import React, {Component} from 'react'
import styled from 'styled-components'
import Icon from 'react-ionicons'

export default class StoreItem extends Component {
    handleAdd = () => {
        const {title, description, price, id,img} = this.props
        this.props.addToCart({title, description, price, id,img})
    }

    render() {
        const {title, description, price, img} = this.props
        return (
            <ProductWrapper>
                <img src={img}/>
                <Description>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <PriceWrapper>
                        <Price>${price}</Price>
                        <AddButton onClick={this.handleAdd}><Icon icon="md-add" color="#fff"/></AddButton>
                    </PriceWrapper>
                </Description>
            </ProductWrapper>
        )
    }
}
const AddButton = styled.button`
  padding:0;
  margin:0;
  padding:5px 6px;
  cursor: pointer;
  background-color: #323333;
`
const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Description = styled.div`
  flex: 0 0 70%;
`
const Price = styled.span`
   margin-right:10px;
`
const PriceWrapper = styled.div`
   text-align: right;
`