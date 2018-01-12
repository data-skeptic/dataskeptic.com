import React, { Component }  from 'react'
import {
  PostTitle,
  Container,
  PodcastBox,
  PlayBox,
  Arrow,
  PlayText
} from './style'

import {
  ItemDate,
  ItemTitle,
  ItemDesc,
  ViewMore,
  ArrowRight
 } from '../Blog/style'

const itemDesc = 'This episode features an interview with Rigel Smiroldo recorded at NIPS 2017 in Long Beach California.  We discuss data privacy, machine learning use cases, model deployment, and end-to-end machine…'

class Podcast extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <Container>
        <PostTitle>Lastest Podcast</PostTitle>
        <PodcastBox>
          <ItemDate>DECEMBER 22, 2017</ItemDate>
          <ItemTitle>Mercedes Benz Machine Learning Research</ItemTitle>
          <PlayBox>
            <Arrow />
            <PlayText>Play</PlayText>
            <PlayText>15:59</PlayText>
          </PlayBox>
          <ItemDesc>{itemDesc}</ItemDesc>
          <ViewMore>View More</ViewMore>
          <ArrowRight />
        </PodcastBox>
      </Container>
    )
  }
}

export default Podcast