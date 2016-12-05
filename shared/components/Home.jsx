import React, { Component , PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Slider from "react-slick"

import Episode from "./Episode"
import MailingList from "./MailingList"
import SocialMediaCard from "./SocialMediaCard"
import EpisodeCard from "./EpisodeCard"
import LatestBlogCard from "./LatestBlogCard"
import LatestEpisodePlayer from "./LatestEpisodePlayer"

class Home extends Component {
  render() {
    var oepisodes = this.props.episodes.toJS()
    var oblogs = this.props.blogs.toJS()
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: 1,
      adaptiveHeight: 1,
      accessibility: 1,
      autoplay: 1,
      autoplaySpeed: 5000,
      pauseOnHover: 1
    };
    var episode = undefined
    var old_episode = undefined
    var episodes = oepisodes.episodes
    if (episodes.length > 0) {
      episode = episodes[0]
      var i = 51
      if (episodes.length < i+1) {
        i = episodes.length - 1
      }
      old_episode = episodes[i]
    }
    return (
      <div className="center">
        <div className="row">
          <div className="col-sm-12 home-statement">
            <h2>About Data Skeptic</h2>
            <p>Data Skeptic is the weekly podcast that is skeptical of and with data.  We explain the methods and algorithms that power our world in an accessible manner through our short mini-episode discussions and our longer interviews with experts in the field.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <div className="carousel">
              <Slider {...settings}>
                <div className="card">
                  <LatestBlogCard />
                </div>
                <div className="card">
                  <EpisodeCard id="latest_episode" key="latest_episode" episode={episode} title="Latest episode" />
                </div>
                <div className="card">
                  <EpisodeCard id="old_episode" key="old_episode" episode={old_episode} title="From the archives" />
                </div>
                <div className="card">
                  <SocialMediaCard />
                </div>
              </Slider>
            </div>          
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="home-player">
              <LatestEpisodePlayer title="Latest episode:" episode={episode} />
            </div>
            <MailingList />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default connect(state => ({ episodes: state.episodes, blogs: state.blogs }))(Home)
