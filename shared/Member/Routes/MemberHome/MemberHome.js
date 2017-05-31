import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { push } from 'react-router-redux';

import Container from '../../../Layout/Components/Container/Container';
import Content from '../../../Layout/Components/Content/Content';

import {changePageTitle} from '../../../Layout/Actions/LayoutActions';

class MemberHome extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {title} = MemberHome.getPageMeta();
        this.props.changePageTitle(title);

        if (!this.props.isAuthorized) {
            this.props.history.push('/login');
        }
    }

    static getPageMeta() {
        return {
            title: 'Member Page | Data Skeptic'
        }
    }

    render() {
        return (
            <div className="members-home-page">
                <Container>
                    <h1>Home</h1>
                </Container>
            </div>
        )
    }

}

export default connect(
    state => ({
        isAuthorized: false
    }),
    (dispatch) => bindActionCreators({
        changePageTitle
    }, dispatch)
)(MemberHome)

