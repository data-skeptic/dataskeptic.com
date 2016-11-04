import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"

export default class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			src: props.src
		}
		console.log(22)
		axios
		  .get(this.state.src)
		  .then(function(result) {
		  	console.log(111)
		  	console.log(result)
		  })
		console.log(23)
	}
	
	render() {
		var content = "This is a blog"
		return (
			<div class="center">
				Specifics
				{this.props.src}
				<span dangerouslySetInnerHTML={{__html: content}} />
			</div>
		)
	}
}
