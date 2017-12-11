import styled from "styled-components";
import React from "react";

export default props =>
  <Container>
    {props.children}
  </Container>;

const Container = styled.div`
  ${props => (props.global ? `min-height: 88vh` : ` margin: 0px ${props.theme.container.margin}`)};
`;
