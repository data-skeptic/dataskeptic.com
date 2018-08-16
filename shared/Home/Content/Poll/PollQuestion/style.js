import styled from 'styled-components'

export const PollContainer = styled.div`
  box-sizing: border-box;
  background-color: #E4DCC6;
  border: solid 5px white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  padding: 0 30px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
`

export const PollTitle = styled.div`
  font-size: 26px;
  color: #38383A;
  margin-top: 40px;
`

export const Question = styled.div`
  margin-top: 7px;
  font-size: 20px;
  color: #575959;
  font-weight: normal;
`

export const ChoiceList = styled.div`
  margin-top: 10px;
`

export const PollChoice = styled.div`
  font-size: 20px;
  height: 49px;
  padding: 9px 0 0 15px;
  border-bottom: 1px solid #CFC8B5;
  & > input[type='radio'] {
    display: none;
  }
  & > label {
    position: relative;
  }
  & > input[type='radio']:checked + label ${PollLabel}::after {
    background-color: #F0D943;
  }
`

export const PollLabel = styled.span`
  margin-left: 5px;
  font-size: 20px;
  color: #575959;
  font-weight: normal;
  &:hover {
    cursor: pointer;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: -15px;
    width: 16px;
    height: 16px;
    border: solid 3px white;
    border-radius: 8px;
    box-shadow: 1px 1px 1px 1px #CFC8B5;
    background-color: white;
    transition: ease .25s, background-color .25s;
  }
`

export const ViewVoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 17px;
`

export const ViewResultLink = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #2E1453;
  position: relative;
  
  :hover {
    cursor: pointer;
  }
  
  :before,
  :after {
    border-right: 2px solid;
    content: '';
    display: block;
    height: 8px;
    margin-top: -6px;
    position: absolute;
    transform: rotate(135deg);
    right: -10px;
    top: 50%;
    width: 0;
  }

  :after {
    margin-top: -1px;
    transform: rotate(45deg);
  }
`

export const VoteContainer = styled.div`
  display: flex;
  align-items: center;
`

export const VoteButton = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-color: #2E1453;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 11px;
    
    :hover {
      cursor: pointer;
    }
    
    & > span {
      font-size: 16px;
      font-weight: normal;
      color: #333333;
    }
`

export const VoteTick = styled.div`
  color: #F0D943;
  font-size: 18px;
  font-weight: normal;
`
