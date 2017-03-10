import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import isEmpty from 'lodash/isEmpty';
import {fetchCurrentProposal} from '../Actions/ProposalsActions';

import Container from '../../Layout/Components/Container/Container';
import Content from '../../Layout/Components/Content/Content';
import SideBar from '../../Layout/Components/SideBar/SideBar';

class Proposals extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (isEmpty(this.props.proposal)) {
            this.props.fetchCurrentProposal();
        }
    }

    render() {
        const {proposal} = this.props;
        const {topic, long_description, deadline} = proposal;

        debugger;
        return (
            <div className="proposals-page">
                <Container>
                    <Content>
                        <h2>Request for Comment</h2>
                        <p>Thanks for considering contributing your thoughts for an upcoming episode. Please review the
                            topic below and share any thoughts you have on it. We aren't always able to use every
                            comment submitted, but we will do our best and appreciate your input.</p>
                        <p><b>Current topic:</b> {topic}</p>
                        <p>{long_description}</p>
                        <b>Time to comment:</b>
                        {/*<CountdownClock deadline={deadline} />*/}
                        <p>Name: <input id="name"/></p>
                        <p>Email: <input id="email"/></p>
                        {/*<CommentFormatContainer />*/}
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
        fetchCurrentProposal
    }, dispatch)
)(Proposals)

