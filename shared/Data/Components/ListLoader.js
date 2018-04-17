import React, { Component } from 'react'
import styled from 'styled-components'

export default () => (
  <Box>
    <Bot
      src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
      width="120"
    />
    <Container>
      <SubTitle>Loading...</SubTitle>
    </Container>
  </Box>
)

const Box = styled.div`
  background-color: #f4f4f4;
  padding: 32px;
  margin-top: 24px;
`

const Container = styled.div``

const SubTitle = styled.h3``
