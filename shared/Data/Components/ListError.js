import React, { Component } from 'react'
import styled from 'styled-components'

export default ({ error }) => (
  <Box>
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
  
`

const Bot = styled.img`
    margin-top: -60px;
`

const Title = styled.h2``

const Subtitle = styled.h3``
