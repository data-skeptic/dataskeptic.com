import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import LightsOut from '../../components/LightsOut'
import snserror from '../../SnsUtil'

class NoBlogs extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log("here!")
		console.log(this.props)
		snserror("", "404", "ds-blog404")
	}

	render() {
		return (
			<div className="center">
				<h2>Request not found</h2>
				<p>I'm sorry Dave, I'm not going to be able to retrieve that blog post for you.</p>
				<br/><br/><br/><br/><br/><br/><br/><br/>
				<LightsOut />
				<br/><br/><br/><br/><br/><br/><br/><br/>
			</div>
		)
	}
}
export default connect(state => ({ site: state.site, episodes: state.episodes, blogs: state.blogs }))(NoBlogs)

