import styled from 'styled-components'
import { ViewMore } from '../Blog/style'

export const Container = styled.div`
  @media (max-width: 414px) {
    padding: 0 5px;
  }
`

export const LogoContainer = styled.div`
  @media (max-width: 1024px) {
    text-align: center;
  }
`

export const LogoImg = styled.img`
  width: 230px;
  @media (max-width: 768px) {
    width: 280px;
  }
`

export const DescBox = styled.div`
  padding-left: 55px;
  padding-bottom: 48px;
  @media (max-width: 960px) {
    margin-top: 24px;
    padding-left: 15px;
  }
`

export const Title = styled.span`
  color: #5736E1;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: bold;
`

export const SubTitle = styled.p`
  color: #3A3B3B;
  font-size: 40px;
`

export const Desc = styled.span`
  color: #3A3B3B;
  font-size: 20px;
`

export const BlogViewMore = ViewMore.extend`
  color: #3A3B3B;
  font-size: 20px;
`

export const UserBox = styled.div`
  padding-top: 16px;
  display: flex;
`

export const UserImg = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  
  padding: 4px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`

export const UserDetail = styled.div`
  padding-left: 12px;
  font-size: 14px;
  color: #4A4A4A;
  
  a {
	  border: none;
	  :hover {
	    border: none;
	  }
	}
  
  padding-top: 8px;
`

export const UserInfo = styled.a`
  display: block
`

export const UserImgArea = styled.div`
  a {
	  border: none;
	  :hover {
	    border: none;
	  }
  }
`