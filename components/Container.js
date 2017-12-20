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

const maxWidth = 1200

const Container = styled.div`  
  ${props => props.global && `min-height: 88vh;`}
  ${props => !props.fullWidth && `padding:0 150px;`}
  
  margin: 0 auto;
  width: 100%;
  max-width: ${maxWidth}px;
   
  ${media.tablet`padding: 0 30px;`} 
  ${media.phone`padding: 0 15px;`};
`
