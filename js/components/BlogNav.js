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
					<BlogLink active="/blog" to="/blog">{up}</BlogLink>
					{folders.map(function(folder) {
						var path = "/blog/" + folder
						return (
							<BlogLink key={path} active={pathname} to={path}>{folder}</BlogLink>
						)
					})}
				</div>
			</div>
		)
	}
}
