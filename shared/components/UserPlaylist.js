import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Loading from '../Common/Components/Loading'
import { Link } from 'react-router'
import MembershipHeader from './membership/MembershipHeader'
import ChangeMembership from './membership/ChangeMembership'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class UserPlaylist extends Component {

    componentWillMount() {
        const {title} = UserPlaylist.getPageMeta();
        this.props.dispatch(changePageTitle(title))
    }

    componentDidMount() {
        var dispatch = this.props.dispatch
        if (!this.props.loggedIn) {
            window.location.href = '/login'
        }
    }

    static getPageMeta() {
        return {
            title: 'User Playlist | Data Skeptic'
        }
    }

    render() {
        const { user, loggedIn } = this.props

        return (
            <div className="center">
               Playlist
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn'])
    })
)(UserPlaylist);
