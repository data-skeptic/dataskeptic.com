import React, { Component } from 'react'
import styled from 'styled-components'

export default () => (
  <Box>
    loading
    <Bot
      src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
      width="120"
    />
    <Container>
      <Spinner src="/img/spinner.gif" width="20"/>
      <SubTitle>Loading...</SubTitle>
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


const Bot = styled.img`
  margin-top: -60px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: #5d5a5b;
`

const Spinner = styled.img`
  
`

const SubTitle = styled.span`
  font-weight: bold;
`
