import styled from 'styled-components'

export const Banner = styled.div`
  height: 100px;
  background-size: cover;
  background-position: center;
  border-top: 0.4px solid;
  border-color: rgba(255, 255, 255, 0.2);
  @media (max-width: 1024px) {
    height: 50px;
  }
  @media (max-width: 768px) {
    height: 50px;
  }
  @media (max-width: 320px) {
    height: 25px;
  }
`
