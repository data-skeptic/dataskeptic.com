import React, {Component} from "react";
import styled from "styled-components";
import moment from "moment/moment";
import {connect} from "react-redux";
import {
    getCurrentPlaying,
    getIsPlaying,
    getIsVisible,
    getPosition,
    play,
    pause,
    setCurrentPlaying
} from "../../../redux/modules/playerReducer";

@connect(
    state => ({
        currentPlaying: getCurrentPlaying(state),
        isPlaying: getIsPlaying(state),
        isVisible: getIsVisible(state),
        position: getPosition(state)
    }),
    {play, pause, setCurrentPlaying}
)
export default class EpisodePlayer extends Component {

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
        const {post} = this.props

        const playing = this.isCurrentEpisodePlaying()

        return (
            <Header>
                <HeaderTitle>{post.title}</HeaderTitle>
                <EpisodeDate>{moment(post.publish_date).fromNow()}</EpisodeDate>
                <PlayButton onClick={this.togglePlay}>
                    <img src={!playing ? '/static/play.svg' : '/static/stop.svg'} alt=""/>
                </PlayButton>
            </Header>
        )
    }
}

const PlayButton = styled.button`
  cursor: pointer;
  background: none;
  border: 0px;
  
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