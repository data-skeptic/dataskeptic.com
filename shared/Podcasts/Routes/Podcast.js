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
import { load as loadEpisodes, setYear } from '../../reducers/EpisodesReducer'
import infiniteList from '../../Data/hoc/infiniteList'
import formatRequest from '../../utils/formatRequest'
import page from '../../Layout/hoc/page'

import { get_podcasts } from '../../utils/redux_loader'

const EpisodesList = infiniteList({
  dataSource: state => state.episodes.toJS()
})

class Podcast extends Component {

  constructor(props) {
    super(props)
    console.log("props!")
    console.log(props)
    var dispatch = props.dispatch
    var pathname = "/"
    get_podcasts(dispatch, pathname)
  }

  initFromParams = params => {
    if (params.year) {
      this.props.dispatch(setYear(+params.year))
    }
  }

  updateLocation = params => {
    console.log("!!!!!!!!!!!!!!!!!")
    delete params.firstLoad
    const query = formatRequest(params)
    this.props.router.replace(`/podcast?${query}`)
  }

  loadMore = (attributes, reset) => {
    let { limit, offset, ...params } = attributes
    this.updateLocation(attributes)
    this.props.dispatch(loadEpisodes(limit, offset, params, reset))
  }

  render() {
    const { list = [], years = [], isLoaded = false, year } = this.props
    console.log("PODCAST!")
    console.log(this.props)

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
        </Container>
      </div>
    )
  }
}
/*
  // TODO: add this code back in above once the underlying bugs in year selector are fixed
          <SideBar title="Year">
            <YearSelector years={years} year={year} />
          </SideBar>
*/

export default page(
  connect((state, ownProps) => ({
    eps: state.episodes.toJS(),
    list: state.episodes.getIn(['episodes']).toJS(),
    years: state.episodes.getIn(['years']).toJS(),
    year: state.episodes.getIn(['currentYear']),
    isLoaded: state.episodes.getIn(['loaded'])
  }))(Podcast),
  {
    title: 'Data Skeptic Episodes'
  }
)
