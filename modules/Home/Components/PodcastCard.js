import React from 'react'
import styled from 'styled-components'

export default ({name, media, title, description, author, avatar, date}) => (
    <Wrapper>
        <Label>{name}</Label>
        <Card>
            <Media>{media}</Media>
            <Inner>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Author>
                    <Avatar src={avatar}/>
                    <Info>
                        <Name>{author}</Name>
                        <Date>{date}</Date>
                    </Info>
                </Author>
            </Inner>
        </Card>
    </Wrapper>
);

export const Wrapper = styled.section`
    flex:0 0 31%;
`

export const Label = styled.div`
     margin-bottom: 20px;
    font-size: 20px;
	font-weight: 500;	
	color: rgba(55, 55, 55, 0.87);
`
export const Title = styled.h3`
    font-size: 18px;
	line-height: 1.11;
	color: #373737;
`
export const Inner = styled.div`
  padding:0 32px;
 `

export const Card = styled.div`
    border-radius: 2px;
	border: solid 1px rgba(0, 0, 0, 0.1);
`

export const Description = styled.p`
    font-size: 16px;
	line-height: 1.12;
	text-align: left;
	color: rgba(0, 0, 0, 0.5);
`

export const Avatar = styled.img`
   width:45px;
   height:45px; 
   border-radius:50%;
`

export const Media = styled.div`
    height: 180px;
    
    > * {
      width:100%;
      height:auto;
      max-height:180px;
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
  padding-left:15px;
`

export const Info = styled.div`
   padding-left:15px;

`
