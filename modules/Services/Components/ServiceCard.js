import React from 'react'
import styled from 'styled-components'

const ServiceCard = ({title, text}) => (
    <Card>
        <Title>{title}</Title>
        <Text>{text}</Text>
    </Card>
)
export default ServiceCard

const Card = styled.div` 
    flex:0 0 45%;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0 0;
    background: #fafafa;
    border: 1px solid #d7d9d9;
`
const Title = styled.h2`
 text-align:center;
  font-size: 20px;
`
const Text = styled.p`
 font-size: 15px;
`