import styled from "styled-components";
import React from "react";
import Head from 'next/head';
import { media } from '../modules/styles'

const BASE_DOCUMENT_TITLE = `Data Skeptic`
const pageTitle = title =>
    title
        ? `${title} | ${BASE_DOCUMENT_TITLE}`
        : BASE_DOCUMENT_TITLE

export default props =>
    <Container global={props.global}
               fullWidth={props.fullWidth}
    >
        <Head><title>{pageTitle(props.title)}</title></Head>
        {props.children}
    </Container>

const Container = styled.div`  
  margin: 0 auto;
  width: 100%;
  min-height: 400px;
  
  ${props => !props.fullWidth && `padding:0 150px;`}
  ${props => props.global && `min-height: 88vh;`}
   
  ${media.tablet`padding: 0 30px;`} 
  ${media.phone`padding: 0 15px;`};
  
  ${props => props.fullWidth && `padding:0 !important;`}
`
