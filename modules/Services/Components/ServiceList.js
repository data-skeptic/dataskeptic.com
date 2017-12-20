import React from 'react'
import ServiceCard from './ServiceCard'
import styled from 'styled-components'
import {media} from "../../styles";

const ServiceList = ({list}) => (
    <Wrapper>
        {list.map(service => <ServiceCard key={service.title} {...service} />)}
    </Wrapper>
)
export default ServiceList

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ${media.phone`
        flex-direction: column;
    `};
`
