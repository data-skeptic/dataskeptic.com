import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import styled from 'styled-components'
import Loading from "../../Common/Components/Loading"

import {redirects_map} from '../../../redirects';
import isCtrlOrCommandKey from '../../utils/isCtrlOrCommandKey';
import GuestImage from "./GuestImage";
import {
    markAsPlayed, markFavorite, addPlaylist,
    isPlayed, isFavorited, isPlaylisted
} from "../../Auth/Reducers/AuthReducer";

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

    setPlayed = async (played) => {
        const {userEmail, blogId, guid, media} = this.props
        const data = await markAsPlayed(userEmail, blogId, media, guid, played)
        this.props.dispatch({ type: 'MARK_AS_PLAYED', payload: { data, played, blogId } })
    }

    setFavourite = async (favorited) => {
        const {userEmail, blogId, guid} = this.props
        debugger;
        const data = await markFavorite(userEmail, blogId, guid, favorited)
        this.props.dispatch({ type: 'MARK_AS_FAVORITE', payload: { data, favorited, blogId } })
    }

    setPlaylisted = async (playlisted) => {
        const {userEmail, blogId, guid} = this.props
        const data = await markAsPlayed(userEmail, blogId, guid, playlisted)
        this.props.dispatch({ type: 'ADD_PLAYLIST', payload: { data, playlisted, blogId } })
    }

    render() {
        const { loggedIn } = this.props
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

        const { played, favorited, playlisted } = this.props.states

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
                    <Title>
                        <Link className="blog-title" to={episodeLink} onClick={this.onEpisodeClick}>{ep.title}</Link>
                        <Stats>
                            {loggedIn && <PlayButton played={played} onClick={() => this.setPlayed(!played) }/>}
                            {loggedIn && <FavouriteButton favourited={favorited} onClick={() => this.setFavourite(!favorited) }/>}
                        </Stats>
                    </Title>
                    <Buttons>
                        <EpisodePlayButton onClick={this.onPlayToggle.bind(this, ep)}>
                            {play_symb}
                            <EpisodePlayState>PLAY</EpisodePlayState>
                            <Duration>{duration}</Duration>
                        </EpisodePlayButton>

                       <DownloadEpisode>
                            <DownloadLink href={ep.mp3} download><span>Download</span></DownloadLink>
                        </DownloadEpisode>

                        {loggedIn && <PlaylistButton playlisted={playlisted} onClick={() => this.setPlaylisted(!playlisted) }>
                            <span>{playlisted ? 'Remove from playlist' : 'Add to playlist'}</span>
                        </PlaylistButton>}

                        {transcript}
                    </Buttons>
                    <div className="clear"></div>
                    <div className="episode-desc">
                        <p>{desc}</p>
                        {'  '}<Link to={episodeLink} className="episode-view-more">View More <i className="glyphicon glyphicon-more glyphicon-chevron-right"/></Link>
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

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 4px;
`

const Stats = styled.div`
    margin-top: 8px;
    display: flex;
    
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

const Buttons = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: 600px) {
        flex-direction: column-reverse;
        align-items: flex-start;
        
        > * {
            flex: 1;
            width: 100%;
            margin: 8px 0px;
        }
    }
`

const EpisodePlayButton = styled.button`
    background: #565858;
    border-radius: 20px;
    color: #fff;
    height: 40px;
    padding-left: 28px;
    padding-right: 28px;
    float: left;
    border: none;
    outline: none;
    
    &:hover {
        background-color: #38383A;
    }
    
    &:focus {
        background-color: #222222;
    }
`

const EpisodePlayState = styled.span`
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 15px;
`

const Duration = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
    letter-spacing: 0;
`

const DownloadEpisode = styled.div`
    background-color: #fff;
    background-repeat: no-repeat;
    background-image: url("/img/png/dl-arrow.png");
    background-size: 20px;
    background-position: 0px 2px;
    
    height: 25px;
    line-height: 26px;
`

const DownloadLink = styled.a`
    padding-left: 32px;
    text-decoration: none;
    border: 0px;
    font-size: 14px;
    letter-spacing: 0;
    font-weight: bold;
    
    &:hover {
        border: 0px;
    }
    
    span {
        font-size: 14px;
        letter-spacing: 0;
        font-weight: bold;
        border-bottom: 1px dotted;
    }
`

const PlayButton = styled.button`
    margin-left: 8px;
    width: 32px;
    height: 32px;
    border: none;
    
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 32px;
    background-image: url("${props => props.played ? '/img/uiux/played.png' : '/img/uiux/unplayed.png'}");
    
    &:hover {
          background-image: url("${props => props.played ? '/img/uiux/played.png' : '/img/uiux/playlist_hover.png'}")
    }
`

const FavouriteButton = styled.button`
    margin-left: 8px;
    width: 32px;
    height: 32px;
    border: none;
    
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 32px;
    background-image: url("${props => props.favourited ? '/img/uiux/favorited.png' : '/img/uiux/not-favorited.png'}");
`

const PlaylistButton = styled.button`
    min-width: 180px;
    height: 25px;
    line-height: 26px;
    padding-left: 32px;
    text-align: left;
        
    border: 0px;
    background-color: #fff;
    background-size: 20px;
    background-position: 0px 5px;
    background-repeat: no-repeat;
    background-image: url("/img/uiux/playlist.png");
    
    span {
        font-size: 14px;
        letter-spacing: 0;
        font-weight: bold;
    }
`

export default connect((state, ownProps) => ({
    loggedIn: state.auth.getIn(['loggedIn']),
    userEmail: state.auth.getIn(['user', 'email']),
    player: state.player,
    episodes: state.episodes,
    blogs: state.blogs,
    blogId: ownProps.episode.blog_id,
	  guid: ownProps.episode.guid,
	  media: ownProps.episode.mp3,
    states: {
        played: isPlayed(state, ownProps.episode.blog_id),
        favorited: isFavorited(state, ownProps.episode.blog_id),
        playlisted: isPlaylisted(state, ownProps.episode.blog_id)
    }
}))(Episode)

