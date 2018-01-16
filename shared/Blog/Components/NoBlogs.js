import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import LightsOut from '../../components/LightsOut'

class NoBlogs extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="blog-item-wrapper">
				<h2>Request not found</h2>
				<p>I'm sorry Dave, I'm not going to be able to retrieve that blog post for you.</p>
				<p>How about you just forget about it and solve the puzzle below by turning off all the lights.</p>
				<LightsOut />
				<br/><br/>
			</div>
		)
	}
}
export default connect(state => ({ site: state.site, episodes: state.episodes, blogs: state.blogs }))(NoBlogs)

