import React, { Component } from 'react'
import styled from 'styled-components'

export default ({ error }) => (
  <Box>
    <Bot
      src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
      width="120"
    />
    <Container>
      <Title>Error</Title>
      <Subtitle>{error}</Subtitle>
    </Container>
  </Box>
)

const Box = styled.div`
  background-color: #f4f4f4;
  margin-top: 24px;
  padding: 32px;
`

const Container = styled.div`
  
`

const Bot = styled.img``

const Title = styled.h2``

const Subtitle = styled.h3``
