import styled from 'styled-components'
import React from 'react'

export default props => (
  <Container global={props.global} fullWidth={props.fullWidth}>
    {props.children}
  </Container>
)

const Container = styled.div`
  ${props => props.global && `min-height: 88vh;`} ${props =>
    !props.fullWidth && `margin:0 150px;`};
`
