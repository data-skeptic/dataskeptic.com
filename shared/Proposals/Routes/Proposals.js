import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import classNames from 'classnames'

import isEmpty from 'lodash/isEmpty';
import {fetchCurrentProposal, proposalDeadlineReached} from '../Actions/ProposalsActions';

import Debug from '../../Debug'

import Container from '../../Layout/Components/Container/Container';
import Content from '../../Layout/Components/Content/Content';
import SideBar from '../../Layout/Components/SideBar/SideBar';

import CommentBoxFormContainer from '../Containers/CommentBoxContainer/CommentBoxFormContainer';

import Countdown from '../../Common/Components/Countdown';

import { changePageTitle } from '../../Layout/Actions/LayoutActions';
import {Link} from "react-router";

class Proposals extends Component {

    constructor(props) {
        super(props);

        this.deadline = this.deadline.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillMount() {
        if (isEmpty(this.props.proposal)) {
            this.props.fetchCurrentProposal();
        }

        const dispatch = this.props.dispatch;
        const {title} = Proposals.getPageMeta();
        this.props.changePageTitle(title);
    }

    static getPageMeta() {
        return {
            title: 'Proposals | Data Skeptic'
        }
    }

    login(){
        window.location.href='api/v1/auth/login/google'
    }

    deadline() {
        this.props.proposalDeadlineReached();
    }

    render() {
        const {proposal, hasAccess} = this.props;
        const {topic, long_description, deadline, active, aws_proposals_bucket} = proposal;

        const to = moment(deadline);

        const isClosed = !active;
        // const isClosed = true;

        return (
            <div className={classNames('proposals-page', {'closed': isClosed, 'open': !isClosed})}>

                <Container>
                    <Content>
                        {!isClosed && (
                            <div>
                            <h2>Request for Comment</h2>
                            <p>Thanks for considering contributing your thoughts for an upcoming episode. Please review the
                                topic below and share any thoughts you have on it. We aren't always able to use every
                                comment submitted, but we will do our best and appreciate your input.</p>
                            <h3><b>Current topic:</b> {topic }</h3>
                            <p>{long_description}</p>

                            {deadline ?
                                <p className="deadline"><b>Time to comment:</b><Countdown to={to.toString()} onDeadlineReached={this.deadline}/></p>
                            : null}
                            </div>
                        )}


                        {isClosed
                            ?
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">This RFC has closed.</h3>
                                </div>
                                <div className="panel-body">
                                    We don't have any active topics.  Please check back soon when we launch the next!
                                </div>
                            </div>
                            :
                            <CommentBoxFormContainer aws_proposals_bucket={aws_proposals_bucket} />
                        }
                        { hasAccess
                            ? <span>You are logged in</span>
                            : <button onClick={this.login}  className="btn btn-primary">Login</button>
                        }

                    </Content>
                </Container>
            </div>
        )
    }

}

export default connect(
    state => ({
        proposal: state.proposals.getIn(['proposal']).toJS(),
        hasAccess: state.proposals.getIn(['hasAccess'])
    }),
    dispatch => bindActionCreators({
        fetchCurrentProposal,
        proposalDeadlineReached,
        changePageTitle
    }, dispatch)
)(Proposals)

