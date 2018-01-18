import styled from 'styled-components'
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
  padding-right: 11px;
  color: white;
  cursor: pointer;
`

export const PlayText = styled.span`
  font-size: 14px;
  color: white;
  line-height: 17px;
  padding-right: 15px;
`

export const PodViewMore = styled.a`
  display: inline-block;
  font-size: 14px;
  color: #000;
  line-height: 17px;
  margin-left: 5px;
  margin-right: 3px;
  border: 0;
  background: transparent;
  position: relative;
  padding-right: 20px;

  :before, :after {
    border-right: 2px solid;
    content: '';
    display: block;
    height: 8px;
    margin-top: -6px;
    position: absolute;
    transform: rotate(135deg);
    right: 10px;
    top: 50%;
    width: 0;
  }

  :after {
    margin-top: -1px;
    transform: rotate(45deg);
  }
`