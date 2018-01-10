import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from "./AdminLayout";

class AdminCmsPending extends Component {
	render() {
		const { history } = this.props

		return (
			<AdminLayout history={history}>
                <h3>AdminCmsPending</h3>
            </AdminLayout>
		)
	}
}
export default connect(state => ({

}))(AdminCmsPending)
