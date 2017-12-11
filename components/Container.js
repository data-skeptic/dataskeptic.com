import styled from 'styled-components'
import React from 'react';

export default (props) => (
    <Container>
        {props.children}
    </Container>
);

const Container = styled.div`
    min-height: 88vh;
`

