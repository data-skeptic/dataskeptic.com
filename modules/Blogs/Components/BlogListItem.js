import React, { Component } from "react";
import styled from "styled-components";
import Link from "../../../components/Link";
export default class BlogListItem extends Component {

  render() {
    const { post } = this.props;
    return (
      <Wrapper>
        <Post>
          <Date>
            {post.publish_date}{" "}
          </Date>
          <Header>
            <Avatar>
              <img src={post.contributor.img} />
            </Avatar>
            <PostLink href={`/blogs/details/${post.c_hash}`}>
              <Title>
                {post.title}
              </Title>
              <Author>
                by <strong>{post.contributor.prettyname}</strong>
              </Author>
            </PostLink>
          </Header>

          <Body>
          {" "}{post.desc}... <More href="/blogs/1">View More</More>{" "}
          </Body>
        </Post>
      </Wrapper>
    );
  }
}

const More = styled(Link)`
  color: #000;
  letter-spacing: 0;
  font-weight: 700;
  font-size: 14px;
`;

const Post = styled.div`
  padding-bottom: 50px;
  border-width: 0 0 1px;
  border-color: #979797;
  border-style: solid;
  margin-right: 100px;
`;
const Date = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #7d8080;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
`;
const Body = styled.div`
  margin: 10px 0px;
  text-align: justify;
  & > a {
    border-bottom: 1px dotted;
    text-decoration: none;
    font-family: "SF Medium";
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
  & > strong {
    font-family: 'SF Medium';
  }
`;
const Header = styled.div`display: flex;`;

const Wrapper = styled.div`margin-bottom: 20px;`;

const Title = styled.span`
  font-size: 28px;
  line-height: 34px;
  color: #3a3b3b;
  letter-spacing: 0;
  margin-top: 8px;
  text-decoration: none;
  font-family: 'SF Light';
  border-bottom: 1px dotted;
`;
