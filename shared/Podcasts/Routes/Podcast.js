import React, { Component } from 'react'
import { connect } from 'react-redux'

import Episode from '../Components/Episode'
import Loading from '../../Common/Components/Loading'
import YearSelector from '../../components/YearSelector.js'

import Container from '../../Layout/Components/Container/Container'
import Content from '../../Layout/Components/Content/Content'
import SideBar from '../../Layout/Components/SideBar/SideBar'

import { year_from_path } from '../../utils/redux_loader'
import { load as loadEpisodes } from '../../reducers/EpisodesReducer'
import infiniteList from '../../Data/hoc/infiniteList'
import page from "../../Layout/hoc/page";

const EpisodesList = infiniteList({
  dataSource: state => state.episodes.toJS()
})

class Podcast extends Component {
  updateLocation = () => {}

  loadMore = (limit, offset) => {
    this.updateLocation(limit, offset)
    this.props.dispatch(loadEpisodes(limit, offset))
  }

  render() {
    const pathname = this.props.location.pathname
    const { list = [], years = [], isLoaded = false } = this.props

    let year = year_from_path(pathname)
    if (year === -1) {
      year = years[0]
    }

    return (
      <div className="podcasts-page">
        <Container>
          <Content>
            {!isLoaded ? (
              <div className="loading-area">
                <Loading />
              </div>
            ) : (
              <EpisodesList
                autoLoad={true}
                items={list}
                Item={(item, index) => <Episode episode={item} key={index} />}
                loadMore={this.loadMore}
              />
            )}
          </Content>
          <SideBar title="Year">
            <YearSelector years={years} year={year} />
          </SideBar>
        </Container>
      </div>
    )
  }
}

export default page(connect(state => ({
  eps: state.episodes.toJS(),
  list: state.episodes.getIn(['episodes']).toJS(),
  years: state.episodes.getIn(['years']).toJS(),
  isLoaded: state.episodes.getIn(['loaded'])
}))(Podcast), {
  title: 'Podcasts'
})
