import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"
import ReactDisqus from 'react-disqus';

import MailingListBlogFooter from "./MailingListBlogFooter"

export default class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			src: props.src,
			username: "dataskeptic",
			content: "Loading..."
		}
		var me = this
		axios
			.get(this.state.src)
			.then(function(result) {
				var content = result["data"]
				me.setState({content})
			})
			.catch(function (err) {
				console.log(err)
				me.setState({content: "<div class=\"blog-error\">Error, cannot load.</div>"})
			})
	}
	
	render() {
		var uid = 'http://dataskeptic.com/blog' + this.props.pathname
		console.log(uid)
		return (
			<div class="center">
				<span dangerouslySetInnerHTML={{__html: this.state.content}} />
				<MailingListBlogFooter />
				<ReactDisqus shortname={this.state.username} identifier={uid} />
			</div>
		)
	}
}
