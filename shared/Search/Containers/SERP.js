import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {changePageTitle} from "../../Layout/Actions/LayoutActions";
import MobileSearchArea from "./MobileSearchArea";
import SearchField from "../Components/SearchField";
import Loading from "../../Common/Components/Loading";
import styled from "styled-components";
import {Link} from "react-router";
import moment from "moment/moment";
import Highlighter from "react-highlight-words";

import redirectToSearch from "../Helpers/redirectToSearch";

const formatDate = (date) => moment(date).format('MMMM D, Y')

const getLocationQuery = (search) => {
	const params = search.replace('?', '').split("=")
	let query = !!params[1] ? params[1] : ''
	if (query) {
			query = decodeURIComponent(query)
	}

	return query
}

const highlight = (query='', text='') => {
	const searchWords = query.split(' ')

	return <Highlighter
		highlightClassName='matching'
		searchWords={searchWords}
		autoEscape={true}
		textToHighlight={text}
	/>
}

class SERP extends Component {

	componentWillMount() {
		const query = getLocationQuery(this.props.location.search)
		if (query.length === 0) {
			// redirect to home
			this.props.history.push('/')
		}

		const {title} = SERP.getPageMeta();
		this.props.dispatch(changePageTitle(title))

		if (!this.props.loaded) {
			this.loadResults(query)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.query !== nextProps.query) {
				const title = `Search - ${nextProps.query} | Data Skeptic`
				this.props.dispatch(changePageTitle(title))
				this.updateLocation(nextProps.query)
		}
	}

	updateLocation = (query) => redirectToSearch(query, false)

	static getPageMeta() {
		return {
			title: 'Search | Data Skeptic'
		}
	}

	handleSearchChange = (query) => {
		if (query.length > 0) {
			this.loadResults(query)
		}
	}

	loadResults = (query) => {
		const { dispatch } = this.props

		dispatch({
			type: 'SEARCH',
			payload: {
				query,
				dispatch
			}
		})
	}

	renderEmpty = () =>
		<div className="search-results-empty">
			<h4>Your search <i>“{this.props.query}”</i> did not match any blog.</h4>
			<p>Make sure that all words are spelled correctly or try different keywords.</p>
		</div>

	renderPosts = (posts) =>
		posts.map(({title, abstract, prettyname, date_created, related}, i) => {
			const preview = related && (related.filter((r) => r.type === 'homepage-image'))[0]
			return (
				<Post key={i} to={`/blog${prettyname}`}>
					{preview && <Preview>
						<img src={preview.dest} alt={title} />
					</Preview>}
					<Inner indent={!!preview}>
						<Date>{formatDate(date_created)}</Date>
						<Title>{highlight(this.props.query, title)}</Title>
						<Abstract>{highlight(this.props.query, abstract)}</Abstract>
					</Inner>
				</Post>
			)
		})

	renderResultsBlock = (results) =>
		<div className="search-results">
			{results.length === 0
				? this.renderEmpty()
				: <div>
						<div className="search-results-statistic">
							<b>{results.length}</b> Results
						</div>
						<div className="search-results-items">
							{this.renderPosts(results)}
						</div>
					</div>
			}
		</div>

	render() {
		let {query, loaded, isLoading, results} = this.props

		return (
			<div className="center search-page">
				<div className="search-line">
					<SearchField
						transparent={true}
						autoFocus={false}
						onChange={this.handleSearchChange}
						loading={isLoading}
						value={query}
					/>
				</div>

				{isLoading && <Loading />}
				{loaded && this.renderResultsBlock(results)}
			</div>
		)
	}
}
export default connect((state) => ({
		loaded: state.search.get('loaded'),
		query: state.search.get('query'),
		isLoading: state.search.get('loading'),
		results: state.search.get('results').toJS()
}))(SERP)

const Post = styled(Link)`
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
    
    padding: 8px 0px;
	  border-bottom: 1px solid #eee;
	  color: #333;
	  
	  &:hover {
	     color: #000;
	     border-bottom-color: #eee;
	  }
   
    @media (max-width: 768px) {
       flex-direction: column;
    }
`

const Preview = styled.div`
    min-width: 200px;
    max-width: 400px;
    
    flex-basis: auto;
    flex-grow: 1;
    text-align: center;
    
    img {
        margin: 4px 0px;
        max-width: 80%;
    }
    
    @media (max-width: 768px) {
       min-width: 400px;
       max-width: 400px;
    }
`

const Inner = styled.div`
    
`

const Title = styled.h4`
    margin: 0px 0px 12px 0px;
   
    * {
      font-size: 19px;
      font-weight: normal;
    }
`

const Date = styled.div`
    margin: 4px 0px;
    font-weight: bold;
    font-size: 90%;
    color: #7D8080;
    text-transform: uppercase;
    letter-spacing: 1px;
`

const Abstract = styled.div`
    margin: 8px 0px;
    line-height: 24px;
`
