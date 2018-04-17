import React, { Component } from 'react'
import styled from 'styled-components'

export default ({ error }) => (
  <Box>
    error
    <Bot
      src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
      width="120"
    />
    <Container>
      <Subtitle>{error}</Subtitle>
    </Container>
  </Box>
)

const Box = styled.div`
  background-color: #f4f4f4;
  padding: 12px;
  margin-top: 84px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  color: #5d5a5b;
  display: flex;
  flex-direction: row;
`

const Bot = styled.img`
  margin-top: -60px;
`

const Subtitle = styled.span`
  font-size: 90%;
  color: #c7254e;
`
