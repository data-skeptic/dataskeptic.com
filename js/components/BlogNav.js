import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"
import ReactDisqus from 'react-disqus';

import BlogLink from './BlogLink'

export default class BlogNav extends React.Component {
	
	render() {
		var folders = this.props.folders
		var pathname = this.props.pathname
		var up = ".."
		return (
			<div class="blog-nav">
				<div class="blog-categories">
					<div class="blog-link-container">
						<BlogLink active="/blog" to="/blog">{up}</BlogLink>
					</div>
					{folders.map(function(folder) {
						var path = "/blog/" + folder
						return (
							<div class="blog-link-container">
								<BlogLink key={path} active={pathname} to={path}>{folder}</BlogLink>
							</div>
						)
					})}
				</div>
				<div class="clear"></div>
			</div>
		)
	}
}
