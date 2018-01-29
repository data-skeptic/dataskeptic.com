import styled from 'styled-components'

export const Banner = styled.div`
  background: url(/img/png/ds-banner.png) no-repeat;
  height: 360px;
  background-size: cover;
  background-position: center;
  border-top: .4px solid;
  border-color: rgba(255, 255, 255, 0.2);
  @media (max-width: 1024px) {
    height: 256px;
  }
  @media (max-width: 768px) {
    height: 192px;
  }
  @media (max-width: 320px) {
    height: 118px;
  }
`