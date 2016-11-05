import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"

import MailingListBlogFooter from "./MailingListBlogFooter"

export default class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			src: props.src,
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
		return (
			<div class="center">
				<span dangerouslySetInnerHTML={{__html: this.state.content}} />
				<MailingListBlogFooter />
			</div>
		)
	}
}
