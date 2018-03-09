import styled from 'styled-components'

export const ContentContainer = styled.div`
  padding: 55px 55px 0;
  margin: 0 135px;
  background-color: white;
  margin-top: -80px;
  height: 80px;

  @media (max-width: 1336px) {
    margin: 0 55px;
    margin-top: -80px;
    padding: 25px 25px 0;
  }

  @media (max-width: 1024px) {
    margin: 0;
    padding: 20px 20px 0;
  }

  @media (max-width: 414px) {
    padding: 20px 0 0;
  }
`

export const BlogContainer = styled.div`
  @media (max-width: 768px) {
    padding-bottom: 48px;
  }
`

export const PodContainer = styled.div`
  @media (max-width: 414px) {
    padding: 0;
  }
`
