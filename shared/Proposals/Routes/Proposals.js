import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import classNames from 'classnames'

import {fetchCurrentProposal, proposalDeadlineReached} from '../Actions/ProposalsActions';


import Container from '../../Layout/Components/Container/Container';
import Content from '../../Layout/Components/Content/Content';
import CommentBoxFormContainer from '../Containers/CommentBoxContainer/CommentBoxFormContainer';
import Countdown from '../../Common/Components/Countdown';
import {changePageTitle} from '../../Layout/Actions/LayoutActions';


class Proposals extends Component {

    constructor(props) {
        super(props);
        this.deadline = this.deadline.bind(this);
        this.login = this.login.bind(this);
        this.getAuthorizedUser = this.getAuthorizedUser.bind(this);
        this.state = {
            authorizedUser: null
        }
    }

    componentWillMount() {
        this.props.fetchCurrentProposal();
        const dispatch = this.props.dispatch;
        const {title} = Proposals.getPageMeta();
        this.props.changePageTitle(title);
        this.getAuthorizedUser();
    }

    static getPageMeta() {
        return {
            title: 'Proposals | Data Skeptic'
        }
    }

    login() {
        window.location.href = 'api/v1/auth/login/google'
    }
    getAuthorizedUser(){
        const user = localStorage.getItem('authorizedUser');
        debugger
        if (user){
            this.setState({
                authorizedUser : user
            })

            console.dir(this.state)
        }
    }

    deadline() {
        this.props.proposalDeadlineReached();
    }

    render() {
        const {proposal = {}, hasAccess} = this.props;
        const {topic, long_description, deadline, active, aws_proposals_bucket} = proposal;
        const {authorizedUser} = this.state;
        const to = moment(deadline);

        const isClosed = !active;
        // const isClosed = true;

        if (hasAccess || authorizedUser) {
            return (
                <div className={classNames('proposals-page', {'closed': isClosed, 'open': !isClosed})}>

                    <Container>
                        <Content>

                            {!isClosed && (
                                <div>
                                    <h2>Request for Comment</h2>
                                    <p>Thanks for considering contributing your thoughts for an upcoming episode. Please
                                        review the
                                        topic below and share any thoughts you have on it. We aren't always able to use
                                        every
                                        comment submitted, but we will do our best and appreciate your input.</p>
                                    <h3><b>Current topic:</b> {topic}</h3>
                                    <p>{long_description}</p>

                                    {deadline ?
                                        <p className="deadline"><b>Time to comment:</b><Countdown to={to.toString()}
                                                                                                  onDeadlineReached={this.deadline}/>
                                        </p>
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
                                        We don't have any active topics. Please check back soon when we launch the next!
                                    </div>
                                </div>
                                :
                                <CommentBoxFormContainer aws_proposals_bucket={aws_proposals_bucket}/>
                            }
                            {hasAccess || authorizedUser
                                ? <span>You are logged in</span>
                                : <button onClick={this.login} className="btn btn-primary">Login</button>
                            }

                        </Content>
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div className={classNames('proposals-page', {'closed': isClosed, 'open': !isClosed})}>
                    <Container>
                        <div className="login-container">
                            <h2>Welcome to the Data Skeptic</h2>
                            <h3>Request For Comment</h3>
                            <button onClick={this.login} className="btn btn-primary">Login</button>
                        </div>

                    </Container>
                </div>
            );
        }

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

