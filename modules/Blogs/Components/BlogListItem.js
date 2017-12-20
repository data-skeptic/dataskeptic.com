import React, { Component } from "react";
import styled from "styled-components";
import Link from "../../../components/Link";
import moment from 'moment'
import {media} from "../../styles";
export default class BlogListItem extends Component {

  render() {
    const { publish_date, prettyname, title, author, desc} = this.props;
    return (
      <Wrapper>
        <Post>
          <Date>
            {moment(publish_date).format('MMMM D, YYYY')}{" "}
          </Date>
          <Header>
            <Avatar>
              <img src={author.img} />
            </Avatar>
            <PostLink href={`/blog${prettyname}`}>
              <Title>
                {title}
              </Title>
              <Author>
                by <strong>{author.prettyname}</strong>
              </Author>
            </PostLink>
          </Header>

          <Body>
          {" "}<div dangerouslySetInnerHTML={{__html: desc}} />... <More href={`/blog${prettyname}`}>View More</More>{" "}
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
 
  ${media.phone`
      margin-right: 0px;
  `}
`

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
  & > strong {
    
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
  border-bottom: 1px dotted;
`
