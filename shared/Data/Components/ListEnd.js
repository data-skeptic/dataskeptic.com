import React, { Component } from 'react'
import styled from 'styled-components'

export default ({ message }) => <Box>{message}</Box>

const Box = styled.div`
  background-color: #f4f4f4;
  padding: 12px;
  margin-top: 84px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #5d5a5b;
`
