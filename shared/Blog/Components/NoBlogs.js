import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LightsOut from '../../components/LightsOut'

class NoBlogs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <h2>Request not found</h2>
        <img src="https://s3.amazonaws.com/dataskeptic.com/img/bot/star-animation_250x250.gif" />
        <p>
          I'm sorry Dave, I'm not going to be able to retrieve that blog post for you.
        </p>
        <p>
          How about you just forget about it and solve the puzzle below by
          turning off all the lights.
        </p>
        <LightsOut />
        <br />
        <br />
      </Container>
    )
  }
}
export default connect(state => ({
  site: state.site,
  episodes: state.episodes,
  blogs: state.blogs
}))(NoBlogs)

const Container = styled.div`
  width: 400px;
  margin: 0px auto;
`
