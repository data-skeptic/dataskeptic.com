import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'

class RelatedContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	fulfilled: false
    }
  }

  render() {
  	return (
      <div>
        <h3>RelatedContent</h3>
        <p>Coming soon</p>
      </div>
  	)
  }
}
export default connect(state => ({ admin: state.admin }))(RelatedContent)
