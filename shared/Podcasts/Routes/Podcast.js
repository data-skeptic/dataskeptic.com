import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'

import Episode from '../Components/Episode'
import Loading from '../../Common/Components/Loading'
import YearSelector from '../../components/YearSelector.js'

import Container from '../../Layout/Components/Container/Container'
import Content from '../../Layout/Components/Content/Content'
import SideBar from '../../Layout/Components/SideBar/SideBar'

import { changePageTitle } from '../../Layout/Actions/LayoutActions'
import {load as loadEpisodes, setYear} from '../../reducers/EpisodesReducer'
import infiniteList from '../../Data/hoc/infiniteList'
import formatRequest from "../../utils/formatRequest";

const EpisodesList = infiniteList({
  dataSource: state => state.episodes.toJS()
})

class Podcast extends Component {
  constructor(props) {
    super(props)
  }

  static getPageMeta() {
    return {
      title: 'Podcasts | Data Skeptic'
    }
  }

  componentDidMount() {
    const dispatch = this.props.dispatch

    const { title } = Podcast.getPageMeta()
    dispatch(changePageTitle(title))
  }

  initFromParams = (params) => {
    if (params.year) {
      this.props.dispatch(setYear(+params.year))
    }
  }

  updateLocation = params => {
    delete params.firstLoad
    const query = formatRequest(params)
    this.props.history.replace(`/podcasts?${query}`)
  }

  loadMore = (attributes, reset) => {
    let { limit, offset, ...params } = attributes
    this.updateLocation(attributes)
    this.props.dispatch(loadEpisodes(limit, offset, params, reset))
  }

  render() {
    const { list = [], years = [], isLoaded = false, year } = this.props

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
                location={this.props.location}
                autoLoad={true}
                items={list}
                Item={(item, index) => <Episode episode={item} key={index} />}
                loadMore={this.loadMore}
                initFromParams={this.initFromParams}
                params={{
                  year
                }}
              />
            )}
          </Content>
          <SideBar title="Year">
            <YearSelector years={years} year={year}/>
          </SideBar>
        </Container>
      </div>
    )
  }
}

export default connect(state => ({
  eps: state.episodes.toJS(),
  list: state.episodes.getIn(['episodes']).toJS(),
  years: state.episodes.getIn(['years']).toJS(),
  year: state.episodes.getIn(['currentYear']),
  isLoaded: state.episodes.getIn(['loaded'])
}))(Podcast)

