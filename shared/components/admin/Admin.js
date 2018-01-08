import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {isAdministratorUser} from '../../Auth/Helpers/UserTypes'
import SendEmail from './SendEmail'
import OpenOrders from './OpenOrders'
import OrderProcessing from './OrderProcessing'
import HomepageController from './HomepageController'
import CMS from './CMS'
import Guests from './Guests'
import RelatedContent from './RelatedContent'
import RelatedContentList from './RelatedContentList'
import Loading from '../../Common/Components/Loading'
import AdminMenu from './AdminMenu'

class Admin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ready: false
		}
	}

	componentDidMount() {
		var dispatch = this.props.dispatch
        if (!this.hasAccess()) {
            this.props.history.push('/admin/login')
            return
        } else {
            this.setState({ ready: true })
		    dispatch({type: "INIT_ORDERS", payload: {dispatch} })
		    dispatch({type: "CMS_GET_HOMEPAGE_CONTENT", payload: {dispatch} })
        }
	}

    hasAccess() {
		return true
       const { user } = this.props;
          if(isAdministratorUser(user.type)){
       	     return true
	   }
	   else {
       	return false
	   }
    }



	render() {
		var oadmin = this.props.admin.toJS()
		var relatedcontent = oadmin['relatedcontent'] || []
		var order = oadmin.order
		if (order == undefined) {
			return <Loading />
		}
		var step = order.step
		var errorMsg = order.errorMsg

		const { ready } = this.state

		return ready && (
			<div>
                <AdminMenu />
                <div className="center">
                    {step}
                    {errorMsg}
                    <h2>Admin</h2>

                    menu?

                    <CMS admin={this.props.admin} mode="pending" />
                    <hr/>

                    <CMS admin={this.props.admin} mode="recent" />
                    <hr/>

                    <HomepageController />
                    <hr/>

                    <RelatedContent />
                    <hr/>

                    <RelatedContentList items={relatedcontent} />
                    <hr/>

                    <OrderProcessing admin={this.props.admin} />
                    <hr/>

                    <OpenOrders />
                    <hr/>

                    <SendEmail />
                    <hr/>

                    <div className="clear" />
                </div>
            </div>
		)
	}
}
export default connect(state => ({
	admin: state.admin,
	isAdmin : state.admin.isAdmin,
	products: state.products,
    user: state.auth.getIn(['user']).toJS()
}))(Admin)
