import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import styled from 'styled-components'
import Loading from "../../Common/Components/Loading"

import {redirects_map} from '../../../redirects';
import isCtrlOrCommandKey from '../../utils/isCtrlOrCommandKey';
import GuestImage from "./GuestImage";

class Episode extends React.Component {
    constructor(props) {
        super(props)

        this.onEpisodeClick = this.onEpisodeClick.bind(this);
    }

    onPlayToggle(episode) {
        this.props.dispatch({type: "PLAY_EPISODE", payload: episode})
    }

    formatLink(link) {
        link = link.replace('https://dataskeptic.com', '');
        link = link.replace('http://dataskeptic.com', '');

        if (!!redirects_map[link]) {
            return redirects_map[link];
        }

        return link;
    }

    onEpisodeClick(e) {
        if (!isCtrlOrCommandKey(e)) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        var ep = this.props.episode
        var oplayer = this.props.player.toJS()
        var oblogs = this.props.blogs.toJS()
        var player = oplayer.player
        var desc = ep.desc || ""
        var i = desc.indexOf("</p>")
        if (i > 0) {
            desc = desc.substring(0, i)
        }
        desc = desc.replace(/(<([^>]+)>)/ig, "")
        var duration = ep.duration
        var play_symb = <span>&#9658;</span>
        if (oplayer.is_playing) {
            if (oplayer.episode.guid == ep.guid) {
                play_symb = <span>&#10073;&#10073;</span>
            }
        }
        var playing_symbol = (
            <button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>&#9658; <span
                className="episode-duration">{duration}</span></button>
        )
        if (oplayer.is_playing) {
            if (oplayer.episode.guid == ep.guid) {
                playing_symbol = (
                    <button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>&#10073;&#10073;
                        <span className="episode-duration">{duration}</span></button>
                )
            }
        }

        const date = moment(ep.pubDate).format('MMMM D, YYYY');

        var transcript = <div></div>
        var tep = undefined
        var ep_link = ep.link || "/blog" + ep['prettyname']
        console.log(ep_link)
        const episodeLink = this.formatLink(ep_link);
        const guests = ep.related && ep.related.filter((r) => r.type === 'person')

        return (
            <div className="row episode">
                <div className="col-xs-12 col-sm-3 episode-left">
                    <LinkArea>
                        <Link to={episodeLink} onClick={this.onEpisodeClick}>
                            <img className="episode-img" src={ep.img}/>
                        </Link>
                    </LinkArea>

                    <Guests>
                        {guests && guests.map((g, i) => <GuestImage key={i} {...g} />)}
                    </Guests>
                </div>
                <div className="col-xs-12 col-sm-8 episode-middle">
                    <div className="blog-date">{date}</div>
                    <Link className="blog-title" to={episodeLink} onClick={this.onEpisodeClick}>{ep.title}</Link>
                    <br/>
                    <div className="episode-button-row">
                        <button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>{play_symb}
                            <span className="episode-play">PLAY</span> <span
                                className="episode-duration">{duration}</span></button>
                        <div className="episode-download">
                            <a className="episode-download-img" href={ep.mp3} download><img className="dl-arrow"
                                                                                            src="/img/png/dl-arrow.png"/></a>
                            <a className="episode-download-txt" href={ep.mp3} download>Download</a>
                        </div>
                        {transcript}
                    </div>
                    <div className="clear"></div>
                    <div className="episode-desc">
                        <p>{desc}</p>
                        <Link to={episodeLink} className="episode-view-more">View More <i className="glyphicon glyphicon-more glyphicon-chevron-right"/></Link>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        )
    }
}

const LinkArea = styled.div`
`

const Guests = styled.div`
    padding: 4px 0px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    clear: both;
`

export default connect(state => ({player: state.player, episodes: state.episodes, blogs: state.blogs}))(Episode)

