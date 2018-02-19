import styled from 'styled-components'
import { Title } from '../Blog/style'

export const JobsListingTitle = Title.extend`
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

export const Box = styled.div`
  background-color: #F4F4F4;
  padding: 32px;
  margin-top: 24px;
  @media (max-width: 414px) {
    padding: 24px 20px;
  }
`