import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

import BlogItem from "./BlogItem"

export default class Blog extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		if (this.props.isExact) {
			console.log(2)
			return (
				<div class="center">
					Categories
					<Link to="/blog/test">Blog test</Link>
				</div>
			)
		} else {
			console.log(3)
			var content = "This is a blog"
			console.log(this.props.location.pathname)
			// Look it up in Dynamo via API, retrieve S3 url
			var uri = "https://s3.amazonaws.com/dev.dataskeptic.com/test/test1.htm"
			return (
				<div class="center">
					<BlogItem src={uri} />
				</div>
			)
		}
	}
}
