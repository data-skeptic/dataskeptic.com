import React, { Component } from "react";
import styled, {withTheme} from "styled-components";
import EpisodePlayer from "../../Player/Components/EpisodePlayer";
import moment from 'moment';

export default class Podcast extends Component {
  render() {
    const {post, playing, togglePlay} = this.props;

    return (
      <Wrapper>
        <EpisodePlayer post={post}/>
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
  margin: 10px 0px;
  color:${props => props.theme.colors.dark};
`
const HeaderTitle = styled.div`
  font-size: 11pt;
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
`;
const Title = styled.span`
  font-size: 28px;
  line-height: 34px;
  color: #3a3b3b;
  letter-spacing: 0;
  margin-top: 8px;
  text-decoration: none;
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


const Wrapper = styled.div`margin-bottom: 20px;`;
const Content = styled.div``



