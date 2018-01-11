import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changePageTitle} from '../Layout/Actions/LayoutActions';
import Analytic from "../Analytic/Analytic";

class AnalyticsPage extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const {title} = AnalyticsPage.getPageMeta();
        this.props.changePageTitle(title);
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            window.location.href = '/login'
        }
    }

    static getPageMeta() {
        return {
            title: `Analytics | Data Skeptic`
        }
    }

    render() {
        const { user, loggedIn } = this.props

        return loggedIn && (
            <div className="center">
                <Analytic />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn']),
    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(AnalyticsPage);
