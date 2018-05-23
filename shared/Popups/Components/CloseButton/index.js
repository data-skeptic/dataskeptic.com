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

const outMargnin = 14

const Inner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
  width: 100%;
  height: 100%;
`

const Button = styled.button`
  position: absolute;
  border: none;
  overflow: hidden;
  width: 40px;
  height: 40px;
  padding: 2px;
  background-color: #565858;
  border-radius: 20px;
  right: 0px;
  top: 0px;
  transform: translateX(${outMargnin}px) translateY(-${outMargnin}px);
  box-shadow: 0px 1px 15px rgba(146, 146, 146, 0.1);

  &:hover {
    background: #3a3a3a;
  }

  &:active {
    background: #222;

    ${Inner} {
      transition-duration: 300ms;
      transform: translateZ(0) rotate(-180deg);
      box-shadow: inset 0 0 1em black;
    }
  }
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
  background-color: #fff;

  ${props =>
    props.left &&
    `
    transform: rotate(45deg);
  `} ${props =>
    props.right &&
    `
    transform: rotate(-45deg);
  `};
`
