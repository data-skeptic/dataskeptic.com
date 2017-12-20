import styled from "styled-components";
import React from "react";
import Head from 'next/head';

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

const Container = styled.div`
  ${props => props.global && `min-height: 88vh;`}
  ${props => !props.fullWidth && `margin:0 150px;`}
`;
