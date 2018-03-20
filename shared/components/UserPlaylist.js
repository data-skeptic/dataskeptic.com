import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router'

import { getPlaylistEpisodes, addEpisodes } from '../utils/redux_loader'
import { changePageTitle } from '../Layout/Actions/LayoutActions'
import moment from 'moment/moment'
import { addPlaylist, isPlaylistLoaded } from '../Auth/Reducers/AuthReducer'
import Loading from '../Common/Components/Loading'

const renderDate = date => moment(date).format('MMMM D, YYYY')
const CURRENT_YEAR = new Date()
  .getFullYear()
  .toString()
  .substr(-2)
const debounce = 1300

const isPlayingEpisode = (playing, playedEpisodeGuid, guid) =>
  playing && playedEpisodeGuid === guid

const renderPlayedSymbol = (playing, playedEpisodeGuid, guid) =>
  isPlayingEpisode(playing, playedEpisodeGuid, guid) ? (
    <span>&#10073;&#10073;</span>
  ) : (
    <span>&#9658;</span>
  )

class UserPlaylist extends Component {
  fetchPlaylist = async playlist => {
    this.props.dispatch({ type: 'FETCH_PLAYLIST_START' })
    const data = await getPlaylistEpisodes(playlist)
    this.props.dispatch({
      type: 'SET_PLAYLIST_EPISODE',
      payload: { data }
    })
  }
  startPlay = episode => {
    this.props.dispatch({ type: 'PLAY_EPISODE', payload: episode })
  }
  remove = ({ blog_id, guid }) => {
    const playlisted = false
    this.props.dispatch({
      type: 'ADD_PLAYLIST',
      payload: { playlisted, blogId: blog_id }
    })

    setTimeout(() => {
      addPlaylist(blog_id, guid, playlisted)
    }, debounce)
  }
  goToPodcasts = () => this.props.history.push('/podcast')
  renderEpisode = episode => (
    <Episode key={episode.blog_id}>
      <Inner>
        <Preview
          onClick={() => this.startPlay(episode)}
          playing={isPlayingEpisode(
            this.props.isPlaying,
            this.props.playerEpisodeGuid,
            episode.guid
          )}
        >
          <img src={episode.img} alt={episode.title} />
          <PlaySymbol>
            {renderPlayedSymbol(
              this.props.isPlaying,
              this.props.playerEpisodeGuid,
              episode.guid
            )}
          </PlaySymbol>
        </Preview>
        <Info>
          <Time>{renderDate(episode.pubDate)}</Time>
          <EpisodeTitle to={episode.prettyname}>{episode.title}</EpisodeTitle>
          <Description>{episode.abstract}</Description>
        </Info>
        <RemoveButton
          type="button"
          onClick={() => this.remove(episode)}
          className="close"
          aria-label="Remove"
        >
          <span aria-hidden="true">&times;</span>
        </RemoveButton>
      </Inner>
    </Episode>
  )

  static getPageMeta() {
    return {
      title: 'My Playlist | Data Skeptic'
    }
  }

  componentWillMount() {
    const { title } = UserPlaylist.getPageMeta()
    this.props.dispatch(changePageTitle(title))
  }

  componentDidMount() {
    var dispatch = this.props.dispatch
    if (!this.props.loggedIn) {
      window.location.href = '/login'
    }

    const playlist =
      this.props.user && this.props.user.lists && this.props.user.lists.playlist
    if (playlist) {
      this.fetchPlaylist(playlist)
    }
  }

  renderPlaylist(episodes = []) {
    return <Section>{episodes.map(this.renderEpisode)}</Section>
  }

  addEpisodesByType(type) {
    this.props.dispatch({ type: 'FETCH_PLAYLIST_START' })
    addEpisodes(type)
      .then(data => {
        const { success, playlist, error } = data
        if (!success) {
          return console.error(error)
        }

        this.props.dispatch({
          type: 'SET_PLAYLIST',
          payload: { playlist }
        })
        this.fetchPlaylist(playlist)
      })
      .catch(err => {
        console.error(err)
      })
  }

  renderEmpty() {
    return (
      <Section>
        <p>
          You don't have anything in your playlist. Please click one of the
          buttons below
        </p>
        <Buttons>
          <ActionButton
            first={true}
            onClick={() => this.addEpisodesByType('all')}
          >
            <span>Add all episodes</span>
          </ActionButton>
          <ActionButton onClick={() => this.addEpisodesByType(CURRENT_YEAR)}>
            <span>
              Add all episodes for <i>20{CURRENT_YEAR}</i>
            </span>
          </ActionButton>
          <ActionButton onClick={this.goToPodcasts} last={true}>
            <span>Visit podcast page</span>
          </ActionButton>
        </Buttons>
      </Section>
    )
  }

  renderContent() {
    const { user, playlistLoaded } = this.props

    if (!playlistLoaded) {
      return <Loading />
    }

    let { playlistEpisodes } = user

    return playlistEpisodes.length > 0
      ? this.renderPlaylist(playlistEpisodes)
      : this.renderEmpty()
  }

  render() {
    const { loggedIn } = this.props
    if (!loggedIn) return <div />

    return (
      <Container>
        <PageTitle>My playlist</PageTitle>
        {this.renderContent()}
      </Container>
    )
  }
}

export default connect(state => ({
  user: state.auth.getIn(['user']).toJS(),
  loggedIn: state.auth.getIn(['loggedIn']),
  isPlaying: state.player.getIn(['is_playing']),
  playerEpisodeGuid: state.player.getIn(['episode', 'guid']),
  playlistLoaded: isPlaylistLoaded(state)
}))(UserPlaylist)

const Container = styled.div`
  margin: 25px auto;
  clear: both;
  max-width: 675px;
`

const PageTitle = styled.h2``

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

  ${props =>
    props.first &&
    `
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: 0px;
    `} ${props =>
      props.last &&
      `
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left: 0px;
    `};
`

const Episode = styled.div`
  position: relative;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid #979797;
`

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const Preview = styled.button`
  width: 60px;
  height: 60px;
  position: relative;
  border: none;
  padding: 0px;

  img {
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0.8;
    width: 100%;
    height: 100%;
  }

  &:hover {
    img {
      opacity: 1;
    }
  }

  ${props =>
    props.playing &&
    `
      img {
        opacity: 1 !important;
      } 
    `};
`

const PlaySymbol = styled.span`
  position: absolute;
  left: 30px;
  top: 30px;
  z-index: 1;
  transform: translate(-50%, -50%);
  color: #fff;

  span {
    font-size: 30px;
    text-shadow: 0px 0px 5px #000000;
  }
`

const Info = styled.div`
  flex: 2;
  padding: 0px 12px;
`

const Time = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #7d8080;
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
  padding-right: 10px;
`

const RemoveButton = styled.button`
  position: absolute;
  right: 5px;
  right: 5px;
  color: #888;

  &:focus,
  &:hover {
    color: #000;
  }
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
    background-color: #38383a;
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
  padding-left: ${60 + 12}px;
`
