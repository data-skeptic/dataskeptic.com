import React, { Component } from 'react'
import { Link } from 'react-router'

class LoadingEpisodeListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {id, link, title, date, desc} = this.props;

        return (
            <div className="row episode">
                <div className="col-xs-12 col-sm-3 episode-left preloader">
                    <img className="episode-img" src="/img/blank.gif"/>
                </div>
                <div className="col-xs-12 col-sm-8 episode-middle">
                    <div className="blog-date"><span className="preloader">{date}</span></div>
                    <a className="blog-title preloader" href="#">{title}</a>
                    <br/>

                    <div className="episode-button-row preloader">
                        <p className="preloader">
                            <img src="/img/blank.gif" width="166" height="40"/>
                        </p>
                    </div>
                    <div className="clear"/>
                    <div className="episode-desc preloader">{desc}</div>
                </div>
                <div className="clear"/>
            </div>
        )
    }
}

export default LoadingEpisodeListItem;