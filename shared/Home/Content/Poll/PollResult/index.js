import React,  { Component } from 'react'
import { connect } from 'react-redux'
import {
  PollContainer,
  PollTitle,
  Question
} from '../PollQuestion/style'
import {
  ResultList,
  VoteResult,
  ChoiceTitle,
  VoteCountContainer,
  VoteCount,
  VotePercentContainer,
  VotePercent,
  VoteText
} from "./style";
import Loading from '../../../../Common/Components/Loading'

class PollResult extends Component {
  renderVoteResult = (results, total_votes) => {
    return results.map((vote, i) => {
      const vote_percent = total_votes === 0 ? 0 : +vote.votes / total_votes * 100
      
      return (
        <VoteResult key={i}>
          <VoteCountContainer>
            <ChoiceTitle>
              {vote.response}
            </ChoiceTitle>
            <VoteCount>{vote.votes}</VoteCount>
          </VoteCountContainer>
          <VotePercentContainer>
            <VotePercent percent={vote_percent} strokeWidth={"4"} strokeColor={"#F0D943"} trailWidth={"4"} trailColor={"white"} />
            <VoteText>votes</VoteText>
          </VotePercentContainer>
        </VoteResult>
      )
    })
  }
  
  render () {
    const { question, results, total_votes, isLoading, loaded } = this.props
    
    return (
      <PollContainer>
        <PollTitle>
          Results
        </PollTitle>
        <Question>
          {question}
        </Question>
        <ResultList>
          {isLoading && <Loading />}
          {loaded && this.renderVoteResult(results, total_votes)}
        </ResultList>
      </PollContainer>
    )
  }
}

export default connect(state => ({
  isLoading: state.poll.get('loading'),
  loaded: state.poll.get('loaded'),
  question: state.poll.get('question'),
  results: state.poll.get('results').toJS(),
  total_votes: state.poll.get('total_votes')
}))(PollResult)
