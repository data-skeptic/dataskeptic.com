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
		  	console.log(result)
		  	var content = result["data"]
		  	me.setState({content})
		  })
	}
	
	render() {
		return (
			<div class="center">
				Specifics
				{this.props.src}
				<span dangerouslySetInnerHTML={{__html: this.state.content}} />
				<MailingListBlogFooter />
			</div>
		)
	}
}
