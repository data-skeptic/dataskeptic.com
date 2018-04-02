import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import moment from 'moment'
import axios from 'axios'
import { v4 } from 'uuid'
import { connect } from 'react-redux'

import MiniPlayer from '../Components/MiniPlayer'
import VolumeBarContainer from './VolumeBarContainer'
import { isPlayed, markAsPlayed } from '../../Auth/Reducers/AuthReducer'
import { initialize as initializePlayer } from '../../../shared/reducers/PlayerReducer'
import { setVolume } from '../../reducers/PlayerReducer'

const URL = '/api/v1/player'

const ZERO_POS_STR = '0:00'

const CAPTURE_TYPES = {
  END: 'END',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  SEEK: 'SEEK',
  POS: 'POS'
}

class PlayerContainer extends Component {
  /**
   * Record player action
   *
   * @param {String} type Action Type
   * @param {Object} meta Action meta
   */

  constructor(props) {
    super(props)

    this.onPlayToggle = this.onPlayToggle.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onReady = this.onReady.bind(this)
    this.update = this.update.bind(this)
    this.capture = this.capture.bind(this)
    this.positionUpdate = this.positionUpdate.bind(this)
    this.getFormattedPosition = this.getFormattedPosition.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.mute = this.mute.bind(this)
    this.unmute = this.unmute.bind(this)

    this.state = {
      position: 0,
      loaded: false,
      howler: undefined,
      muted: false,
      ready: false
    }

    this.player = null
  }

  componentDidMount() {
    this.setState({ ready: true })
    // start update timer
    this.updater = setInterval(this.update, 1000)
    this.props.dispatch(initializePlayer())
  }

  componentWillUnmount() {
    // clear the memory
    this.player = null
    clearInterval(this.updater)
  }

  initRef = ref => {
    this.player = ref
  }

  /**
   * Return howler pointer
   */
  getHowler() {
    return this.player.howler
  }

  /**
   * Return playing duration
   */
  getDuration() {
    return this.player.duration()
  }

  /**
   * Return playing position
   */
  getSeek() {
    const howler = this.getHowler()

    return howler ? howler.seek() : 0
  }

  getGuid() {
    const { guid = '' } = this.props.oepisode.toJS()
    return guid
  }

  getSessionId() {
    return this.props.isAuthorized
  }

  /**
   * Update slider position
   */
  update() {
    if (!this.props.player) return
    if (!this.player) return
    if (!this.getHowler()) return
    if (!this.props.player.is_playing) return
    if (!this.props.player.playback_loaded) return
    const listenerId = this.getSessionId()
    const seek = this.getSeek()
    const duration = this.getDuration()
    const guid = this.getGuid()
    const position = 100.0 * seek / duration

    this.props.dispatch({ type: 'PROGRESS_UPDATE', payload: position })
    this.capture(CAPTURE_TYPES.POS, {
      seek,
      duration,
      position,
      guid,
      listenerId
    })
  }

  /**
   * Helper function
   * format time
   */
  pad(n, width) {
    var z = '0'
    n = n + ''
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
  }

  /**
   * Format digital position to string
   * @param val
   * @returns {string}
   */
  formatPosition(val) {
    const m = val / 60
    const min = Math.floor(m)
    const sec = Math.floor(val - min * 60)
    const duration = min + ':' + this.pad(sec, 2)

    return duration
  }

  /**
   * Handler for end of playing
   */
  onEnd() {
    const howler = this.getHowler()
    howler.stop()
    this.stopPlay()
    this.props.dispatch({ type: 'STOP_PLAYBACK', payload: {} })

    this.capture(CAPTURE_TYPES.END)
  }

  /**
   * On payload ready handler
   *
   */
  onReady() {
    const seekPosition = this.props.player.seekPosition
    const duration = this.getDuration()

    if (seekPosition) {
      const realPosition = 1.0 * seekPosition / 100 * duration
      this.player.seek(realPosition)
    }

    this.props.dispatch({ type: 'PLAYBACK_LOADED', payload: true })
    this.update()
  }

  /**
   * Toggle podcast play state
   *
   */
  onPlayToggle() {
    const isPlaying = this.props.player.is_playing
    if (isPlaying) {
      this.stopPlay()
    } else {
      this.resumePlay()
    }
  }

  /**
   * Stop audio player loading
   */
  stopPlay() {
    const howler = this.getHowler()
    howler.pause()

    this.props.dispatch({ type: 'STOP_PLAYING' })

    this.capture(CAPTURE_TYPES.PAUSE, {
      pos: this.getSeek()
    })
  }

  /**
   * Resume audio player loading
   */
  resumePlay() {
    const howler = this.getHowler()
    howler.play()

    this.props.dispatch({ type: 'RESUME_PLAYING' })

    this.capture(CAPTURE_TYPES.PLAY, {
      pos: this.getSeek()
    })
  }

  capture(type, meta = {}) {
    const { isAuthorized, loggedIn } = this.props
    const uid = v4()

    // if (isAuthorized) {
    //   const metaId = `${uid}_playerMeta`
    //   localStorage.setItem(metaId, JSON.stringify(meta))
    //   axios
    //     .post(URL, { type, meta })
    //     .then(data => {})
    //     .catch(err => console.error(err))
    // }

    const { position } = meta
    if (type === CAPTURE_TYPES.POS) {
      if (loggedIn && (position >= 90 && !this.props.played)) {
        console.dir('mark as played')
        const episode = this.props.oepisode.toJS()
        const { blog_id, guid, media } = episode
        const played = true
        this.props.dispatch({
          type: 'MARK_AS_PLAYED',
          payload: { played, blogId: blog_id }
        })

        markAsPlayed(blog_id, media, guid, played)
      } else if (position >= 90) {
        this.props.dispatch({
          type: 'PLAYED'
        })
      }
    }
  }

  /**
   * Playing position change handler
   */
  positionUpdate(position) {
    const duration = this.getDuration()
    const realPosition = 1.0 * position / 100 * duration

    this.props.dispatch({ type: 'PLAYER_SEEK', payload: position })

    this.player.seek(realPosition)

    this.capture(CAPTURE_TYPES.SEEK, {
      position: position,
      realPosition: realPosition
    })
  }

  /**
   * Return real px-based slider position
   * @returns {integer|string}
   */
  getFormattedPosition() {
    if (!this.props.player) return ZERO_POS_STR
    if (!this.player) return ZERO_POS_STR

    const { position } = this.props.player

    let duration = this.getDuration()
    duration = this.formatPosition(duration)

    let min = 0
    let sec = 0
    let hr = 0

    const arr = duration.split(':')
    if (arr.length === 2) {
      min = +arr[0]
      sec = +arr[1]
    } else {
      hr = +arr[0]
      min = +arr[1] + 60 * hr
      sec = +arr[2]
    }

    const d = min * 60 + sec
    const p = 1.0 * d * position / 100

    return this.formatPosition(p)
  }

  /**
   * Return formatted duration
   *
   * @returns {*}
   */
  getFormattedDuration() {
    if (!this.props.player) return ZERO_POS_STR
    if (!this.player) return ZERO_POS_STR

    const { position } = this.props.player

    let duration = this.getDuration()
    duration = this.formatPosition(duration)

    let min = 0
    let sec = 0
    let hr = 0

    const arr = duration.split(':')
    if (arr.length === 2) {
      min = +arr[0]
      sec = +arr[1]
    } else {
      hr = +arr[0]
      min = +arr[1] + 60 * hr
      sec = +arr[2]
    }

    const d = min * 60 + sec
    const p = 1.0 * d * position / 100

    let left = d - p
    if (left <= 1) left = 0

    return this.formatPosition(left)
  }

  /**
   * Set howler audio level
   *
   * @param {Number} volume Volume Level
   */
  setVolume(volume) {
    const howler = this.getHowler()

    howler.volume(volume)
    this.props.dispatch(setVolume())
  }

  mute() {
    this.state.muted = true
  }

  unmute() {
    this.state.muted = false
  }

  render() {
    const { player, oepisode } = this.props
    const { is_playing, has_shown, position, playback_loaded, volume } = player
    const playerVolume = this.props.muted ? 0 : volume

    if (!has_shown) {
      return null
    }

    if (!oepisode) {
      return
    }

    const episode = oepisode.toJS()

    let { title, img, pubDate, mp3 } = episode

    if (pubDate) {
      pubDate = moment(pubDate).format('MMMM D, YYYY')
    }

    const howler = (
      <ReactHowler
        src={mp3}
        html5={true}
        playing={is_playing}
        ref={this.initRef}
        onEnd={this.onEnd}
        onLoad={this.onReady}
      />
    )

    const volumeController = (
      <VolumeBarContainer
        volume={playerVolume}
        onChange={this.setVolume}
        onMute={this.mute}
        onUnmute={this.unmute}
      />
    )

    const realDur = this.getFormattedDuration()
    const realPos = this.getFormattedPosition()
    return (
      <MiniPlayer
        preview={img}
        playing={is_playing}
        episode={episode}
        title={title}
        duration={realDur}
        date={pubDate}
        position={position}
        realPos={realPos}
        howler={howler}
        onSeek={this.positionUpdate}
        onPlayToggle={this.onPlayToggle}
        loaded={playback_loaded}
        volumeSlider={volumeController}
      />
    )
  }
}

export default connect(state => ({
  isAuthorized: state.site.getIn(['sessionId']),
  loggedIn: state.auth.get('loggedIn'),
  player: state.player.toJS(),
  oepisode: state.player.getIn(['episode']),
  played: isPlayed(state, state.player.getIn(['episode', 'blog_id']))
}))(PlayerContainer)
