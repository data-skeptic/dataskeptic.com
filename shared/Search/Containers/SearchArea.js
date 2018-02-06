import React, { Component } from "react"
import { connect } from "react-redux";
import {toggleSearchArea} from "../../Layout/Actions/LayoutActions";
import SearchField from "../Components/SearchField";

class SearchArea extends Component {

	toggleArea = () => this.props.dispatch(toggleSearchArea())

	handleSearchChange = (query) => {
		const { dispatch } = this.props
		dispatch({
			type: 'SEARCH',
			payload: {
				query,
				dispatch
			}
		})
	}

  render() {
		const {searchAreaVisible, isLoading, query} = this.props

	  return (
		  <div className="navlink-li-btn-container">
			  {searchAreaVisible && <div className="search-field-container">
				  <SearchField
					  autoFocus={true}
					  onChange={this.handleSearchChange}
					  loading={isLoading}
					  value={query}
				  />
			  </div>}
			  <button className="navlink-btn" onClick={ this.toggleArea }>
				  <div className="search-btn-wrap">
					  <div className="search-btn-container">
						  &nbsp;
					  </div>
				  </div>
			  </button>
		  </div>
	  )
  }
}


export default connect(state => ({
	searchAreaVisible: state.layout.getIn(['searchAreaVisible']),
	isLoading: state.search.getIn(['loading']),
	query: state.search.getIn(['query'])
}))(SearchArea)
