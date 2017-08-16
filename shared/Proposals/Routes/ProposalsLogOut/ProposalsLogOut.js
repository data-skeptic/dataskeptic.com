import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logOut} from '../../Actions/ProposalsActions';
import {push} from 'redux-react-router'

class ProposalsLogOut extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.logOut();
    }

    componentDidMount() {
        localStorage.removeItem('authorizedUser');
        this.props.history.push('/rfc')
    }

    render() {
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
        logOut
    }, dispatch)
)(ProposalsLogOut)

