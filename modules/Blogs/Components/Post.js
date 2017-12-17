import React, {Component} from "react";
import styled from "styled-components";
import Link from "../../../components/Link";
import Ionicon from 'react-ionicons'

const Post = ({post}) => (
    <Wrapper>
        <Header>
            <Author>Author: {post.author.prettyname}</Author>
            <Social href={`http://twitter.com/${post.author.twitter}`}><Ionicon
                icon="logo-twitter"/> {post.author.twitter}</Social>
            <Social href={`${post.author.linkedin}`}><Ionicon icon="logo-linkedin"/> LinkedIn</Social>
        </Header>
        <Date>{post.publish_date}</Date>
        <Title>{post.title}</Title>
        <Body>
        <Content dangerouslySetInnerHTML={{__html: post.content}}/>
        </Body>
    </Wrapper>
)

export default Post;

const Social = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: black;
  
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
const Avatar = styled.div`
  & > img {
    width: 60px;
  }
`;
const PostLink = styled(Link)`margin-left: 10px;text-decoration: none;`;
const Author = styled.div`
  padding-top: 6px;
`;

const Wrapper = styled.div`margin-bottom: 20px;`;

const Content = styled.div``
