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
        const user = location.search.split("&")[0].replace("?","").split("=")[1]
        const userData = user;
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

