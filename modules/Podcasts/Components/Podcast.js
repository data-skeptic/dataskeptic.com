import React, { Component } from "react";
import styled, {withTheme} from "styled-components";
import Link from "../../../components/Link";
import moment from 'moment';

export default class Podcast extends Component {
  render() {
    const {post, playing, togglePlay} = this.props;

    return (
      <Wrapper>
        <Header>
          <HeaderTitle>{post.title}</HeaderTitle>
          <EpisodeDate>{moment(post.publish_date).fromNow()}</EpisodeDate>
          <PlayButton onClick={togglePlay}>
            <img src={!playing ? '/static/play.svg' : '/static/stop.svg'} alt=""/>
          </PlayButton>
          {/*<Author>Author: {post.contributor.prettyname}</Author>*/}
          {/*<Social href={`http://twitter.com/${post.contributor.twitter}`}><Ionicon icon="logo-twitter" /> {post.contributor.twitter}</Social>*/}
          {/*<Social href={`${post.contributor.linkedin}`}><Ionicon icon="logo-linkedin"/> LinkedIn</Social>*/}
        </Header>
        <Date>{moment(post.publish_date).format('MMMM D, YYYY')}</Date>
        <Title>{post.title}</Title>
        <Body>
        <Content dangerouslySetInnerHTML={{__html:post.content}} />
        </Body>
      </Wrapper>
    )
  }
}

const PlayButton = styled.div`
  img {
    width: 64px;
  }
`
const EpisodeDate = styled.div`
  font-size: 9pt;
  font-family: "SF Medium";
  margin: 10px 0px;
  color:${props => props.theme.colors.dark};
`
const HeaderTitle = styled.div`
  font-size: 11pt;
  font-family: "SF Medium";
  color:${props => props.theme.colors.darker};
`


const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0px;
  border: 2px solid ${props => props.theme.colors.primary};  
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
  
  font-family: 'SF Bold';
`;
const Title = styled.span`
  font-size: 28px;
  line-height: 34px;
  color: #3a3b3b;
  letter-spacing: 0;
  margin-top: 8px;
  text-decoration: none;
  font-family: 'SF Bold';
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


const Wrapper = styled.div`margin-bottom: 20px;`;
const Content = styled.div``



