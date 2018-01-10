import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from "./AdminLayout";
import RelatedContent from "./RelatedContent"

class AdminCmsAddRelated extends Component {
	render() {
		const { history } = this.props

		return (
			<AdminLayout history={history}>
                <h3>Related Content</h3>

                <RelatedContent />
            </AdminLayout>
		)
	}
}
export default connect(state => ({

}))(AdminCmsAddRelated)
