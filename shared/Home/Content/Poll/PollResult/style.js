import styled from 'styled-components'
import { Line } from 'rc-progress'

export const ResultList = styled.div`
  margin-top: 9px;
  margin-bottom: 69px;
`

export const VoteResult = styled.div`
  margin-top: 20px;
`

export const VoteCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`

export const ChoiceTitle = styled.div`
  font-size: 16px;
  color: #575959;
  font-weight: normal;
  line-height: 24px;
`

export const VoteCount = styled.div`
  font-size: 14px;
  color: #575959;
  font-weight: normal;
`

export const VotePercentContainer = styled.div`
  height: 16px;
  position: relative;
` 

export const VotePercent = styled(Line)`
  box-sizing: border-box;
  border: solid 3px white;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 0px #CFC8B5;
`

export const VoteText = styled.span`
  position: absolute;
  right: -5px;
  bottom: -5px;
  font-size: 14px;
  color: #575959;
  font-weight: normal;
`
