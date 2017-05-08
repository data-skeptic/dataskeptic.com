import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import isEmpty from 'lodash/isEmpty';
import {fetchCurrentProposal, proposalDeadlineReached} from '../Actions/ProposalsActions';

import Debug from '../../Debug'

import Container from '../../Layout/Components/Container/Container';
import Content from '../../Layout/Components/Content/Content';
import SideBar from '../../Layout/Components/SideBar/SideBar';

import CommentBoxFormContainer from '../Containers/CommentBoxContainer/CommentBoxFormContainer';

import Countdown from '../../Common/Components/Countdown';

class Proposals extends Component {

    constructor(props) {
        super(props);

        this.deadline = this.deadline.bind(this);
    }

    componentWillMount() {
        if (isEmpty(this.props.proposal)) {
            this.props.fetchCurrentProposal();
        }
    }

    deadline() {
        this.props.proposalDeadlineReached();
    }

    render() {
        const {proposal} = this.props;
        const {topic, long_description, deadline, active} = proposal;

        const to = new Date(deadline);

        // const isClosed = !active;
        const isClosed = false;
        return (
            <div className="proposals-page">
                <Container>
                    <Content>
                        <h2>Request for Comment</h2>
                        <p>Thanks for considering contributing your thoughts for an upcoming episode. Please review the
                            topic below and share any thoughts you have on it. We aren't always able to use every
                            comment submitted, but we will do our best and appreciate your input.</p>
                        <h3><b>Current topic:</b> {topic}</h3>
                        <p>{long_description}</p>

                        {deadline ?
                            <p className="deadline">Time to comment: <kbd><i className="glyphicon glyphicon-time"/> <Countdown to={to} onDeadlineReached={this.deadline}/></kbd></p>
                        : null}

                        {isClosed
                            ?
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">This RFC has closed.</h3>
                                </div>
                                <div className="panel-body">
                                    Please check back later, as we open new topics
                                    regularly.
                                </div>
                            </div>
                            :
                            <CommentBoxFormContainer />
                        }
                    </Content>
                </Container>
            </div>
        )
    }

}

export default connect(
    state => ({
        proposal: state.proposals.get('proposal').toJS()
    }),
    dispatch => bindActionCreators({
        fetchCurrentProposal,
        proposalDeadlineReached
    }, dispatch)
)(Proposals)

