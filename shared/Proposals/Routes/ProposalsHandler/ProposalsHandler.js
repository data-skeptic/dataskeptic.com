import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {authorize} from '../../Actions/ProposalsActions';




class ProposalsHandler extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {id, hasAccess, location} = this.props;
        const userData = JSON.parse(location.query.user);
        return this.props.authorize(!!user);
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

