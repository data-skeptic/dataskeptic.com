import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { 
  PollContainer,
  PollTitle,
  Question,
  ChoiceList,
  PollChoice,
  PollLabel,
  ViewVoteContainer,
  ViewResultLink,
  VoteContainer,
  VoteButton,
  VoteTick
} from "./style"
import Loading from '../../../../Common/Components/Loading'

class PollQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = { choice_id: 1 }
  }
  
  loadPoll = (poll_id, user_id) => {
    const { dispatch } = this.props
    
    dispatch({
      type: 'GET_POLL',
      payload: {
        poll_id,
        user_id,
        dispatch
      }
    })
  }
  
  onChangeChoice = e => {
    this.setState({ 
      choice_id: parseInt(e.currentTarget.value)
    })
  }
  
  onVote = () => {
    const { poll_id, dispatch } = this.props
    const user_id = -1
    const question_id = -1
    const { choice_id } = this.state
    const data = {
      poll_id: poll_id,
      user_id: user_id,
      question_id: question_id,
      choice_id: choice_id
    }
    
    dispatch({
      type: 'POST_POLL',
      payload: {
        data,
        dispatch
      }
    })
  }
  
  onViewResult = () => {
    const { dispatch } = this.props
    
    dispatch({
      type: 'VIEW_POLL_RESULT',
    })
  }
  
  componentWillMount() {
    const poll_id = -1
    const user_id = -1
    
    this.loadPoll(poll_id, user_id)
  }
  
  renderPollChoice = results => {
    const { choice_id } = this.state
    return results.map((vote, i) => {
      return (
        <PollChoice key={i}>
          <input
            type='radio'
            id={ `pollChoice${i + 1}` }
            name='pollChoice'
            value={i + 1}
            checked={choice_id === i + 1}
            onChange={this.onChangeChoice}/>
          <label htmlFor={ `pollChoice${i + 1}` }>
            <PollLabel>{vote.response}</PollLabel>
          </label>
        </PollChoice>
      )
    })
  }
  
  render() {
    const { question, results, isLoading, loaded } = this.props
    
    return (
      <PollContainer>
        <PollTitle>
          Poll Question
        </PollTitle>
        <Question>
          {question}
        </Question>
        {isLoading && <Loading />}
        {loaded &&
        <div>
          <ChoiceList>
            {this.renderPollChoice(results)}
          </ChoiceList>
          <ViewVoteContainer>
            <div>
              <ViewResultLink
                onClick={this.onViewResult}
              >
                View result
              </ViewResultLink>
            </div>
            <VoteContainer>
              <span>Vote</span>
              <VoteButton
                onClick={this.onVote}
              >
                <VoteTick>&#10004;</VoteTick>
              </VoteButton>
            </VoteContainer>
          </ViewVoteContainer>
        </div>
        }
      </PollContainer>
    )
  }
}

export default connect(state => ({
  isLoading: state.poll.get('loading'),
  loaded: state.poll.get('loaded'),
  poll_id: state.poll.get('poll_id'),
  question: state.poll.get('question'),
  results: state.poll.get('results').toJS()
}))(PollQuestion)
