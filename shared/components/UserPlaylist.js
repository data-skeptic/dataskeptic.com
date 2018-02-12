import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router'

import {getPlaylist, addEpisodes} from '../utils/redux_loader'
import {changePageTitle} from '../Layout/Actions/LayoutActions'
import moment from "moment/moment"

const renderDate = (date) => moment(date).format('MMMM D, YYYY')
const CURRENT_YEAR = (new Date().getFullYear().toString().substr(-2))

const renderPlayedSymbol = (playing, playedEpisodeGuid, guid) =>
    playing && (playedEpisodeGuid === guid)
        ? <span>&#10073;&#10073;</span>
        : <span>&#9658;</span>

class UserPlaylist extends Component {

    componentWillMount() {
        const {title} = UserPlaylist.getPageMeta();
        this.props.dispatch(changePageTitle(title))
    }

    componentDidMount() {
        var dispatch = this.props.dispatch
        if (!this.props.loggedIn) {
            window.location.href = '/login'
        }

        const playlist = this.props.user && this.props.user.lists && this.props.user.lists.playlist

        if (playlist) {
            this.fetchPlaylist(playlist)
        }
    }

    fetchPlaylist = async (playlist) => {
        const data = await getPlaylist(playlist);
        this.props.dispatch({type: "SET_PLAYLIST", payload: { data } })
    }

    static getPageMeta() {
        return {
            title: 'My Playlist | Data Skeptic'
        }
    }

    startPlay = (episode) => {
        this.props.dispatch({type: "PLAY_EPISODE", payload: episode})
    }

    goToPodcasts = () => this.props.history.push('/podcast')

    renderEpisode = (episode) =>
        <Episode key={episode.blog_id}>
            <Inner>
                <Preview>
                    <Link to={episode.prettyname}>
                        <img src={episode.img} alt={episode.title}/>
                    </Link>
                </Preview>
                <Info>
                    <Time>{renderDate(episode.pubDate)}</Time>
                    <EpisodeTitle to={episode.prettyname}>{episode.title}</EpisodeTitle>
                    <Description>{episode.abstract}</Description>
                </Info>
                <Play>
                    <PlayButton onClick={() => this.startPlay(episode)}>{renderPlayedSymbol(this.props.isPlaying, this.props.playerEpisodeGuid, episode.guid)}</PlayButton>
                </Play>
            </Inner>
        </Episode>

    renderPlaylist(episodes = []) {
        return (
            <Section>
                {episodes.map(this.renderEpisode)}
            </Section>
        )
    }

    addEpisodes = (type) => {
       addEpisodes(type)
    }

    renderEmpty() {
        return (
            <Section>
                <p>You don't have anything in your playlist. Please click one of the buttons below</p>
                <Buttons>
                    <ActionButton first={true} onClick={() => this.addEpisodes('all')}><span>Add all episodes</span></ActionButton>
                    <ActionButton onClick={() => this.addEpisodes(CURRENT_YEAR)}><span>Add all episodes for <i>20{CURRENT_YEAR}</i></span></ActionButton>
                    <ActionButton onClick={this.goToPodcasts} last={true}><span>Visit podcast page</span></ActionButton>
                </Buttons>
            </Section>
        )
    }

    render() {
        const { user, loggedIn } = this.props
        if (!loggedIn) return <div/>

        let { lists: {playlist}, playlistEpisodes } = user

        return (
            <Container>
                <code>{JSON.stringify(user.lists)}</code>
                <PageTitle>My playlist</PageTitle>
                {playlist && (playlist.length > 0) && playlistEpisodes && (playlistEpisodes.length > 0)
                    ? this.renderPlaylist(playlistEpisodes)
                    : this.renderEmpty()
                }
            </Container>
        )
    }
}

const Container = styled.div`
    margin: 25px auto;
    clear: both;
    max-width: 675px;
`

const PageTitle = styled.h2`
`

const Section = styled.div`
    padding-top: 12px;
`

const Buttons = styled.div`
    display: flex;
`

const ActionButton = styled.button`
    background: #fff;
    border: 1px solid #d7d9d9;
    padding: 8px 12px;
    
    span {
        font-weight: bold;
    }
    
    ${props => props.first && `
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: 0px;
    `}
    
    ${props => props.last && `
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left: 0px;
    `}
`

const Episode = styled.div`
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid #979797;
`

const Inner = styled.div`
    display: flex;
    flex-direction: columns;
`

const Preview = styled.div`
    width: 60px;
    
    img {
        max-width: 100%;
    }
`
const Info = styled.div`
    flex: 2;
    padding: 0px 12px;    
`

const Time = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #7D8080;
    letter-spacing: 1px;
    text-transform: uppercase;
`

const EpisodeTitle = styled(Link)`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
`

const Play = styled.div`
    display: flex;
`

const PlayButton = styled.button`
    background: #565858;
    border-radius: 20px;
    color: #fff;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    
    &:hover {
        background-color: #38383A;
    }
    
    &:focus {
        background-color: #222222;
    }
`

const Description = styled.div`
    font-size: 14px;
    color: #575959;
    letter-spacing: 0;
    line-height: 24px;
`

const Actions = styled.div`
    padding-top: 4px;
    padding-bottom: 8px;
    padding-left: ${60+12}px;
`

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn']),
        isPlaying: state.player.getIn(['is_playing']),
        playerEpisodeGuid: state.player.getIn(['episode', 'guid'])
    })
)(UserPlaylist);
