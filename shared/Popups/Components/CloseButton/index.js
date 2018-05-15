import React from 'react'
import styled from 'styled-components'

export default () => (
  <Button>
    <Inner>
      <Line right />
      <Line left />
    </Inner>
  </Button>
)

const Button = styled.button`
  position: absolute;
  border: none;
  width: 80px;
  height: 80px;
  padding: 30px;
  background: transparent;
  right: 0px;
  top: 0px;
`

const Inner = styled.div`
  position: relative;
  width: 23px;
  height: 23px;
  margin-top: 3px;
`

const Line = styled.span`
  display: block;
  width: 22px;
  height: 1px;
  border-radius: 1px;
  transition: all 0.1s ease;
  opacity: 1;
  position: absolute;
  background-color: #565858;

  ${props => props.left && `
    transform: rotate(-45deg);
    margin-top: -7px;
  `}
  
  ${props => props.right && `
    transform: rotate(45deg);
  `}
`
