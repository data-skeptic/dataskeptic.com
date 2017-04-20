import React, {Component} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import {Link} from 'react-router';

import Loading from "../../Common/Components/Loading"
import Error from "../../Common/Components/Error"
import {loadEpisode, clearEpisode} from "../../utils/redux_loader"

class LatestEpisodePlayer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        var dispatch = this.props.dispatch;
        var episodes = this.props.episodes.toJS();
        var focus_episode = episodes.focus_episode;
        var guid = this.props.guid;
        if (guid) {
            loadEpisode(guid, dispatch)
        }
    }

    componentWillReceiveProps(nextProps) {

        const episodes = nextProps.episodes.toJS();
        const focus_episode = episodes.focus_episode;
        const episode = focus_episode.episode;

        const dispatch = this.props.dispatch;
        const {guid} = this.props;

        if (focus_episode.episode) {
            if (episode.guid !== guid || focus_episode.loaded !== 1) {
                loadEpisode(guid, dispatch);
            }
        }
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        clearEpisode(dispatch);
    }

    onClick(episode) {
        this.props.dispatch({type: "PLAY_EPISODE", payload: episode});
    }

    render() {
        const guid = this.props.guid;
        if (!guid) {
            return <Error />
        }
        var oplayer = this.props.player.toJS();
        var playback_loaded = oplayer.playback_loaded;
        var episodes = this.props.episodes.toJS();
        var focus_episode = episodes.focus_episode;

        var loaded = focus_episode.loaded;
        var episode = focus_episode.episode;
        if (loaded === -1) {
            return <Error />
        }
        else if (!loaded || !episode) {
            return <Error />
        }

        let play_symb = <span>&#9658;</span>;
        if (oplayer.is_playing) {
            if (oplayer.episode.guid === episode.guid) {
                play_symb = <span>&#10073;&#10073;</span>
                if (!playback_loaded) {
                    play_symb = <span>?</span>
                }
            }
        }

        const date = moment(episode.pubDate).fromNow();

        return (
            <div className="home-player">
                <div className="home-player-card">
                    <div className="home-player-title"><Link className="home-player-link"
                                                             to={episode.link}>{episode.title}</Link></div>
                    <p>{date}</p>
                    <button className="episode-button" onClick={this.onClick.bind(this, episode)}>{play_symb}</button>
                </div>
            </div>
        )
    }
}

export default connect(state => ({episodes: state.episodes, player: state.player}))(LatestEpisodePlayer)


