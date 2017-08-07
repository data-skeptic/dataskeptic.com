import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changePageTitle} from '../../../Layout/Actions/LayoutActions';

class ProposalsThankYouPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const dispatch = this.props.dispatch;
        const {title} = ProposalsThankYouPage.getPageMeta();
        this.props.changePageTitle(title);
    }

    static getPageMeta() {
        return {
            title: 'Thank you | Data Skeptic'
        }
    }

    render() {
        return (
            <div className="thank-you">
                <h1>Thank you for your input!</h1>
                <p>If you have anything you'd like to add or follow up on, feel free to reach out to
                    kyle@dataskeptic.com
                    directly.</p>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => bindActionCreators({
        changePageTitle
    }, dispatch)
)(ProposalsThankYouPage);
