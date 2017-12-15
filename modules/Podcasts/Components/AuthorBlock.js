import React, { Component } from "react";
import styled from "styled-components";
import Link from "../../../components/Link";
import Ionicon from 'react-ionicons'

const AuthorBlock = ({author}) => (
  <Wrapper>
    <Image>
      <img src={author.img} />
    </Image>
    <Data>
      <Label>Author:</Label> <Value>{author.prettyname}</Value>
      <Bio>
        {author.bio}
      </Bio>
      <Social href={`http://twitter.com/${author.twitter}`}><Ionicon icon="logo-twitter" /> {author.twitter}</Social>
      <Social href={`${author.linkedin}`}><Ionicon icon="logo-linkedin"/> LinkedIn</Social>
    </Data>
  </Wrapper>
)

const Image = styled.div`
  flex-basis: 42%;
  text-align: center;
`
const Data = styled.div`
  flex-basis: 58%;
`

const Bio = styled.div`
  margin-top: 10px;
  line-height: 22px;
`

export default AuthorBlock;

const Label = styled.span`
  font-size: 15px;
    font-weight: 500;
    margin: 0;
    padding: 0;
`

const Value = styled.span`
  font-family: 'SF Light'
`

const Social = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: black;
  margin: 3px 0px;
  & svg {
    margin-right: 10px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  align-items: center;
`;

const Date = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #7d8080;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 5px 0px;
`;
const Title = styled.span`
  font-size: 28px;
  line-height: 34px;
  color: #3a3b3b;
  letter-spacing: 0;
  margin-top: 8px;
  text-decoration: none;
`;

const More = styled(Link)`
  color: #000;
  letter-spacing: 0;
  font-weight: 700;
  font-size: 14px;
`;


const Body = styled.div`
  margin: 10px 0px;
  text-align: justify;
  & > a {
    border-bottom: 1px dotted;
    text-decoration: none;
    color: black;
  }
  color: #575959;
  letter-spacing: 0;
  line-height: 24px;
  font-size: 15px;
  font-weight: 500;
  padding: 0;
`;

const PostLink = styled(Link)`margin-left: 10px;text-decoration: none;`;
const Author = styled.div`
  padding-top: 6px;
  & > strong {
  }
`;

const Wrapper = styled.div`
    padding: 20px;
    background-color: #eee;
    display: flex;
`;


