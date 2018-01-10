import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from "./AdminLayout";

class AdminCmsRecentRelated extends Component {
	render() {
		const { history } = this.props

		return (
			<AdminLayout history={history}>
                <h3>AdminCmsRecentRelated</h3>
            </AdminLayout>
		)
	}
}
export default connect(state => ({

}))(AdminCmsRecentRelated)
