import styled from 'styled-components'
import React from 'react';

export default (props) => (
    <Container>
        {props.children}
    </Container>
);

const Container = styled.div`
    margin: 0px ${props => props.theme.container.margin};
`

