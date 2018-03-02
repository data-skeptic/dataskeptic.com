import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import AdminLayout from "./AdminLayout"
import AddJob from "../../Jobs/Forms/AddJob";

class AdminAddJob extends Component {

	add = (data) => {
		console.log('add', data)
	}

  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Add job</h3>

				<AddJob onSubmit={this.add} showSubmit={true} allowSubmit={true} submitValue={'Add'}/>
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminAddJob)
