import styled from "styled-components"
import { Title } from '../Blog/style'

export const PostTitle = Title.extend`
  @media (max-width: 414px) {
    padding-left: 20px;
  }
`
export const Container = styled.div`
  border-top: 1px solid #979797;
  padding: 48px 0;
  @media (max-width: 768px) {
    border: 0;
    padding: 0;
  }
`

export const PodcastBox = styled.div`
  background-color: #F4F4F4;
  padding: 32px;
  margin-top: 24px;
  @media (max-width: 414px) {
    padding: 24px 20px;
  }
`

export const PlayBox = styled.div`
  width: 156px;
  height: 40px;
  border-radius: 20px;
  background-color: #565858;
  padding: 12px 22px;
  margin: 20px 0;
  display: flex;
`

export const Arrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 9px solid white;
  padding-right: 11px;
`

export const PlayText = styled.span`
  font-size: 14px;
  color: white;
  line-height: 17px;
  padding-right: 15px;
`