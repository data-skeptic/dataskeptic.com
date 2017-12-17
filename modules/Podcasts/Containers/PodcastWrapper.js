import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {
    loadEpisodesList, getEpisodes, getActiveYear, getNeedReload, getPage, getPageCount,
    setCurrentPage
} from '../../../redux/modules/podcastReducer'
import {setCurrentPlaying} from '../../../redux/modules/playerReducer'
import PodcastListItem from '../Components/PodcastListItem'
import ReactPaginate from 'react-paginate'
import ParamRouter from "../../../components/Router";

@connect(
    state => ({
        episodes: getEpisodes(state),
        year: getActiveYear(state),
        pageCount: getPageCount(state),
        page: getPage(state),
        needReload: getNeedReload(state)
    }),
    {setCurrentPlaying, loadEpisodesList, setCurrentPage}
)
export default class PodcastWrapper extends Component {

    handlePageClick = data => {
        const page = data.selected + 1
        const year = this.props.year

        if (year) {
            ParamRouter.pushRoute('Podcasts Page', {year, page})
        } else {
            ParamRouter.pushRoute('Podcasts', {page})
        }

        this.props.setCurrentPage(page)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.needReload){
            this.refresh(nextProps.year, nextProps.page)
        }
    }

    refresh = (year, page) => {
        this.props.loadEpisodesList(year, page)
        window.scrollTo(0,0)
    }

    render() {
        const {episodes, year, page, pageCount} = this.props;
        const showPaginate = (pageCount - 1) > 1

        return (
            <Wrapper>
                {year && <Year>{year}</Year>}

                {episodes && episodes.length === 0
                    ? <Empty>No episodes found.</Empty>
                    : episodes.map(episode => <PodcastListItem play={this.props.setCurrentPlaying} key={episode.guid} post={episode}/>)}

                {showPaginate &&
                    <PaginationContainer>
                        <ReactPaginate
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            previousLabel={"<"}
                            nextLabel={">"}
                            containerClassName={'pagination'}
                            initialPage={page - 1}
                            breakLabel={<span>...</span>}
                            pageCount={pageCount - 1}
                            onPageChange={this.handlePageClick}
                            disableInitialCallback
                        />
                    </PaginationContainer>
                }
            </Wrapper>
        )
    }
}

const Year = styled.h2`
  text-transform: capitalize;
  padding: 0;
  font-size: 26px;
  color: #3a3b3b;
`

const Wrapper = styled.div`
    margin-top:20px;
    flex-grow: 1;
    flex-basis: 70%;
    width: 70%;
    overflow: hidden;
`


const Empty = styled.div`

`


const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    list-style: none;
    padding-left: 0px;
  }
  
  .pagination > li {
    &.selected {
      background-color: ${props => props.theme && props.theme.colors.primary};
      color: #fff;
    }
    &.disabled {
      cursor: not-allowed;
    }
    cursor: pointer;
    text-align: center;
    
    &.break {
        width: 42px;
        height: 42px;
        line-height: 42px;
    }
    
    > a {
        width: 42px;
        height: 42px;
        line-height: 42px;
        display: block;
    }
  }
  
`