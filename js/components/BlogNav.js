import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"
import ReactDisqus from 'react-disqus';


export default class BlogNav extends React.Component {
	
	render() {
		var folders = this.props.folders
		return (
			<div class="blog-nav">
				Categories:
				<ol class="breadcrumb">
					<div class="blog-categories">
						{folders.map(function(folder) {
							return (
								<li key={folder}>
									<a class="blog-category">{folder}</a>
								</li>
							)
						})}
					</div>
				</ol>
			</div>
		)
	}
}
