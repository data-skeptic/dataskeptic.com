import React, { Component } from 'react'
import styled from 'styled-components'
import Slick from 'react-slick'

export default class BlogsSlider extends Component {
  static defaultProps = {
    blogs: []
  }

  renderSlide = (blog, index) => (
    <div key={index}>
      <h3>{index}</h3>
    </div>
  )

  render() {
    const { blogs } = this.props
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return <Wrapper><Slider {...settings}>{blogs.map(this.renderSlide)}</Slider></Wrapper>
  }
}

export const Wrapper = styled.div``

const Slider = styled(Slick)`

`
