import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

import BlogLink from './BlogLink'

export default class BlogNav extends React.Component {
	
	render() {
		var folders = this.props.folders
		var pathname = this.props.pathname
		var up = ".."
		if (folders == undefined) {
			return <div></div>
		}
		return (
			<div className="blog-nav">
				<div className="blog-categories">
					<div className="blog-link-container">
						<BlogLink active="/blog" to="/blog">{up}</BlogLink>
					</div>
					{folders.map(function(folder) {
						var path = "/blog/" + folder
						return (
							<div key={path} className="blog-link-container">
								<BlogLink active={pathname} to={path}>{folder}</BlogLink>
							</div>
						)
					})}
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}
/*
*/