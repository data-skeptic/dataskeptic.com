import React, { Component }  from 'react'
import Content from './Content'
import { Banner } from './style'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <Banner />
        <Content />
      </div>
    )
  }
}

export default HomeContainer