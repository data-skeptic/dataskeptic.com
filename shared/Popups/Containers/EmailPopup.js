import React, { Component } from 'react'
import popup from "../hoc/popup";
import {connect} from "react-redux";

class EmailPopup extends Component {
  render() {
    return <div>email</div>
  }
}

export default popup(
  connect((state, ownProps) => ({
    
  }))(EmailPopup), 
  {
    key: 'email'
  }
)
