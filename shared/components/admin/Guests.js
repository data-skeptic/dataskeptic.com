import React from 'react'
import ReactDOM from 'react-dom'
import querystring from 'querystring'
import { connect } from 'react-redux'

class Guests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fulfilled: false
    }
  }

  render() {
    return (
      <div>
        <h3>Guests</h3>
        <p>Coming soon</p>
      </div>
    )
  }
}
export default connect(state => ({ admin: state.admin }))(Guests)
