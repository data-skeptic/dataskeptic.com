import styled from 'styled-components'
import { Link } from 'react-router'

export const Container = styled.div`
  border-top: 1px solid #979797;
  padding: 48px 0;
  @media (max-width: 768px) {
    border: 0;
    padding: 0;
  }
  
  @media (max-width: 414px) {
    padding: 0 5px;
  }
`

export const BlogItem = styled.div`
  padding-top: 28px;
`

export const Title = styled.div`
  color: #2D1454;
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
  text-transform: uppercase;
`

export const ItemDate = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: #7D8080;
  display: block;
  padding-bottom: 8px;
`

export const ItemTitle = styled.span`
  font-size: 32px;
  line-height: 40px;
  color: #3A3B3B;
  display: block;
  padding-bottom: 8px;
`

export const ItemDesc = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: #575959;
`

export const ViewMore = styled(Link)`
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

export const Author = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 16px;
`

export const Avatar = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  
  padding: 4px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`

export const Name = styled.div`
  padding-left: 12px;
`