import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {isAdministratorUser} from '../../Auth/Helpers/UserTypes'
import Loading from '../../Common/Components/Loading'
import AdminMenu from './AdminMenu'

class AdminLayout extends Component {

    componentDidMount() {
        const dispatch = this.props.dispatch
        if (!this.hasAccess()) {
            return this.props.history.push('/admin/login')
        }

        dispatch({type: "INIT_ORDERS", payload: {dispatch} })
        dispatch({type: "CMS_GET_HOMEPAGE_CONTENT", payload: {dispatch} })
    }

    hasAccess() {
        const {user} = this.props;
        if (isAdministratorUser(user.type)) {
            return true
        } else {
            return false
        }
    }

    render() {
        const {children} = this.props

        return (
            <div>
                <AdminMenu/>
                <div className="center">
                    {children}
                    <div className="clear"/>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    admin: state.admin,
    isAdmin: state.admin.isAdmin,
    products: state.products,
    user: state.auth.getIn(['user']).toJS()
}))(AdminLayout)
