import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class Login extends Component {

	componentWillMount() {
        const {dispatch} = this.props;
        const {title} = Login.getPageMeta();

        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Login | Data Skeptic'
        }
    }

	render() {
		console.log("login")
		return (
			<div className="center">
				Login yo!
			</div>
		)
	}
}

export default connect(state => ({ products: state.products }))(Login)
