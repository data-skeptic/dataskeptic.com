import styled, { css } from 'styled-components'

const theme = {}

theme.colors = {
  primary: '#f0d943',
  dark: '#3a3b3b',
  darker: '#323333',
  gray: '#a2a6a6',
  light: '#d7d9d9',
  danger: 'rgba(255, 0, 0, 0.87)',
  link: '#fff'
}

theme.container = {
  margin: '150px'
}

export default theme

export const strictForm = css`
  .field-label {
    margin: 0px !important;
    font-weight: bold;
  }

  .field-input {
    input {
      padding: 2px 6px !important;
    }
  }

  @media (min-width: 768px) {
    .onrow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .field-container {
        flex: 1;
        margin-right: 10px;
      }

      &:last-child {
        margin-right: 0px;
      }
    }
  }
`

export const Wrapper = styled.section`
  flex: 0 0 31%;
`

export const Label = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(55, 55, 55, 0.87);
`
export const SponsorTitle = styled.h3`
  font-size: 18px;
  line-height: 1.33;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
`
export const Title = styled.h3`
  font-size: 18px;
  line-height: 1.11;
  color: #373737;
`
export const Inner = styled.div`
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Card = styled.div`
  flex-direction: column;
  display: flex;
  border-radius: 2px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  height: 100%;
`

export const Description = styled.p`
  font-size: 16px;
  height: 90px;
  overflow: hidden;
  line-height: 1.12;
  color: rgba(0, 0, 0, 0.5);
`
export const SponsorPromo = styled.p`
  font-size: 18px;
  line-height: 1.33;
  text-align: center;
`

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`

export const Media = styled.div`
  min-height: 180px;

  > * {
    width: 100%;
    height: auto;
    max-height: 180px;
  }
`
export const SponsorMedia = styled.div`
  margin: 25px 0;
  img {
    width: 100%;
    height: auto;
    max-height: 180px;
  }
`

export const Line = styled.p`
  margin: 0px;
  padding: 0px;
`

export const Name = Line.extend`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`

export const Date = Line.extend`
  font-size: 12px;
  font-weight: 300;
  color: #c1c1c1;
`

export const Author = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  max-height: 50px;
  height: 50px;
`

export const Info = styled.div`
  padding-left: 15px;
`
