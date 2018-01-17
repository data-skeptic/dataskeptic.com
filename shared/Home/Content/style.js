import styled from "styled-components"

export const ContentContainer = styled.div`
  padding: 55px 55px 0;
  margin: 0 135px;
  background-color: white;
  margin-top: -80px;
  
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

export const ADGoesHere = styled.button`
  background-color: #D8D8D8;
  color: #979797;
  text-transform: uppercase;
  font-size: 38px;
  height: 90px;
  margin: 64px 100px;
  margin-top: 16px;
  bottom: 0;
  width: calc(100% - 200px);
  @media (max-width: 768px) {
    display: none;
  }
`