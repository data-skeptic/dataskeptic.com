import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {authorize} from '../../Actions/ProposalsActions';
import {push} from 'redux-react-router'

class AdminLoginHandler extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id, hasAccess, location} = this.props;
        const user = location.query.user
        this.props.history.push('/admin');
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.hasAccess) {
    //         this.props.history.push('/rfc')
    //     }
    // }

    render() {

        return (
            <div>Loading...</div>
        )
    }

}

export default connect(
    state => ({
        isAdmin : state.admin.isAdmin
    }),
    dispatch => bindActionCreators({

    }, dispatch)
)(AdminLoginHandler)

