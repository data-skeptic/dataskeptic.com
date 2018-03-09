import styled from 'styled-components'
import React from 'react'

export default props => <Marker>{props.children}</Marker>

const Marker = styled.span`
  color: ${props => props.color || props.theme.colors.primary};
`
