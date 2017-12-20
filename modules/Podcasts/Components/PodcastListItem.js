import React, {Component} from "react";
import styled, {withTheme} from "styled-components";
import Link from "../../../components/Link";
import moment from 'moment'
import Ionicon from 'react-ionicons'
import {
    getCurrentPlaying, getIsPlaying, getIsVisible, getPosition, pause, play,
    setCurrentPlaying
} from "../../../redux/modules/playerReducer";
import {connect} from "react-redux";
import {media} from "../../styles";

const formatLink = (link) => link.indexOf('/') === 0 ? link : `/podcasts/${link}`

@connect(
    state => ({
        currentPlaying: getCurrentPlaying(state),
        isPlaying: getIsPlaying(state),
        isVisible: getIsVisible(state),
        position: getPosition(state)
    }),
    {play, pause, setCurrentPlaying}
)
export default class PodcastListItem extends Component {

    playCurrent = () => this.props.setCurrentPlaying(this.props.post)

    play = () => {
        if (!this.isCurrentEpisodePlaying()) {
            this.playCurrent()
        }

        this.props.play()
    }

    pause = () => this.props.pause()

    togglePlay = () => {
        if (this.isCurrentEpisodePlaying()) {
            this.pause()
        } else {
            this.play()
        }
    }

    isCurrentEpisodePlaying = () =>
        this.props.currentPlaying
        && this.props.currentPlaying.mp3 === this.props.post.mp3
        && this.props.isPlaying

    render() {
        const {post} = this.props;
        const isPlaying = this.isCurrentEpisodePlaying()

        return (
            <Wrapper>
                <Date>
                    {moment(post.pubDate).format('MMMM D, YYYY')}{" "}
                </Date>
                <Post>
                    <Avatar href={formatLink(post.link)}>
                        <img src={post.img}/>
                    </Avatar>
                    <Body>
                    <TitleWrap>
                        <PostLink href={formatLink(post.link)}>
                            <Title>{post.title}</Title>
                        </PostLink>
                        <ButtonsWrapper>
                            <Button onClick={this.togglePlay}>
                                {isPlaying
                                    ? <Ionicon icon={'md-pause'}/>
                                    : <Ionicon icon={'md-play'}/>
                                }
                                <PlayingStatus>{isPlaying ? `Pause` : `Play` }</PlayingStatus>
                                {' '}{post.duration}
                            </Button>
                            <DownloadButton target="_blank" href={post.mp3}>
                                <Ionicon icon={'md-download'}/> Download
                            </DownloadButton>
                        </ButtonsWrapper>
                    </TitleWrap>
                    {" "}
                    <div dangerouslySetInnerHTML={{__html: post.desc.replace(/Â/g, '')}}/>
                    <More href={formatLink(post.link)}>View More</More>{" "}
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
  display: flex;

  ${media.phone`
    margin-right: 0px;
    flex-direction: column;
  `};
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
const Avatar = styled(Link)`  
  > img {
    width: 200px;
    height: 200px;
    margin-right: 20px;
  }

  ${media.phone`
    text-align: center;
    
    > img{
      margin: 0px;
      width: 100px;
      height: 100px;
    }
  `};
`


const PostLink = styled(Link)`text-decoration: none;`;
const Author = styled.div`
  padding-top: 6px;
`;
const TitleWrap = styled.div`  display: flex;
  flex-direction: column;`;

const Wrapper = styled.div`margin-bottom: 20px;`;

const Title = styled.span`
  font-size: 28px;
  line-height: 34px;
  color: #3a3b3b;
  letter-spacing: 0;
  margin-top: 8px;
  text-decoration: none;
  border-bottom: 1px dotted;
`;

const ButtonsWrapper = styled.div`

    margin-top: 10px;
`

const Button = styled.a`
    background: #fff;
    display: flex;
    align-items: center;
    height: 35px;
        padding: 0;
        color: ${({theme}) => theme.colors.dark};
    padding-left: 14px;
    padding-right: 14px;
    float: left;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    outline: none;
    cursor: pointer;
     svg {
       fill:  ${({theme}) => theme.colors.dark};
      }
    &:hover {
      color: #fff;
      background-color:${props => props.theme.colors.primary}; 
      svg {
       fill:  #fff;
      }
    }
    
    min-width: 120px;
    margin-right: 10px;
`

const DownloadButton = Button.extend`
    
`

const PlayingStatus = styled.span`
    text-align: left;
    width: 50px;
`