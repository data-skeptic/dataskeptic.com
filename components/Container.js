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
    <div>
        <Head><title>{pageTitle(props.title)}</title></Head>
        <Container global={props.global}
                   fullWidth={props.fullWidth}
        >
            {props.children}
        </Container>
    </div>

const maxWidth = 1200

const Container = styled.div`  
  ${props => props.global && `min-height: 88vh;`}
  ${props => !props.fullWidth && `padding:0 150px;`}
  
  margin: 0 auto;
  width: 100%;
  max-width: ${maxWidth}px;
  
  ${media.desktop`padding: 0 18px;`} 
  ${media.tablet`padding: 0 18px;`} 
  ${media.phone`padding: 0 3px;`};
`
