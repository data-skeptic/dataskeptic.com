import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from "./AdminLayout";

class AdminHome extends Component {
	render() {
		const { history } = this.props

		return (
			<AdminLayout history={history}>
                <h3>Welcome to dataskeptic.com administration portal.</h3>
            </AdminLayout>
		)
	}
}
export default connect(state => ({

}))(AdminHome)
