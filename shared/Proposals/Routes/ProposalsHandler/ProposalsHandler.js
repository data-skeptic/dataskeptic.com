import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {authorize} from '../../Actions/ProposalsActions';
import {push} from 'redux-react-router'

class ProposalsHandler extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id, hasAccess, location} = this.props;
        const user = location.query.user
        this.props.authorize(!!user);
        localStorage.setItem('authorizedUser', user);
        if (!!user) {
            this.props.history.push('/rfc')
        }
    }

    render() {
        const {proposal, hasAccess} = this.props;

        return (
            <div>Loading...</div>
        )
    }

}

export default connect(
    state => ({
        hasAccess: state.proposals.getIn(['hasAccess'])
    }),
    dispatch => bindActionCreators({
        authorize
    }, dispatch)
)(ProposalsHandler)

