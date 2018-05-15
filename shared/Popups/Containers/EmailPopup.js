import React, { Component } from 'react'
import popup from "../hoc/popup"
import {connect} from "react-redux"

import { open } from '../helpers/popup'

const KEY = `email`

class EmailPopup extends Component {
  render() {
    return <div>email</div>
  }
}
 
export default popup(
  connect((state, ownProps) => ({
    
  }))(EmailPopup), 
  {
    key: KEY,
    height: '400px',
    width: '400px'
  }
)
