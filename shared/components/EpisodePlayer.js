import React, {Component} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import {Link} from 'react-router';

import Loading from "../Common/Components/Loading"
import Error from "../Common/Components/Error"
import {loadEpisode, clearEpisode} from "../utils/redux_loader"

class EpisodePlayer extends Component {
    constructor(props) {
        super(props)
    }

    onClick(episode) {
        var episode = this.props.episode
        this.props.dispatch({type: "PLAY_EPISODE", payload: episode})
    }

    render() {
        var oplayer = this.props.player.toJS()
        var episode = this.props.episode
        var playback_loaded = oplayer.playback_loaded
        if (!episode) {
            return <div>Loading episode</div>
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

        const date = moment(episode.published_date).fromNow()
        console.log(episode)
        var link = episode.link
        var i = link.indexOf('/blog/')
        link = link.substring(i, link.length)
        return (
            <div className="home-player">
                <div className="home-player-card">
                    <div className="home-player-title"><Link className="home-player-link"
                                                             to={link}>{episode.title}</Link></div>
                    <p>{date}</p>
                    <button className="episode-button" onClick={this.onClick.bind(this, episode)}>{play_symb}</button>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    player: state.player
}))(EpisodePlayer)


