import React, { Component }  from 'react'
import Content from './Content'
import { Banner } from './style'

const pageType = "homepage"

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
        <Content pageType={pageType}/>
      </div>
    )
  }
}

export default HomeContainer