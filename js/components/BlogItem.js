import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"
import ReactDisqus from 'react-disqus'
import MathJax from "mathjax"

import MailingListBlogFooter from "./MailingListBlogFooter"

export default class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			src: props.src,
			username: "dataskeptic",
			content: "Loading...",
			parse_latex: true
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
				if (me.state.parse_latex) {
					me.setState({parse_latex: false})
				}
				else {
					me.setState({content: "<div class=\"blog-error\">Error, cannot load.</div>"})					
				}
			})
	}

	replaceLatex(content, key, pre, post) {
		if (!this.state.parse_latex || true) {
			return content
		}
		var i = content.indexOf(key)
		console.log([key, "*", i, this.state.parse_latex])
		while (i >= 0) {
			var j = content.indexOf(key, i+1)
			if (j != -1) {
				var before = content.substring(0, i)
				var orig = content.substring(i+2, j)
				console.log(["|", i, j, content.substring(i,i+2)])
				console.log(orig)
				var middle = pre + katex.renderToString(orig) + post
				console.log(middle)
				var after  = content.substring(j+2, content.length)
				content = before + middle + after
			}
			var i = content.indexOf(key, j+1)
		}
		return content
	}
	
	render() {
		console.log(["v", 1])
		var uid = 'http://dataskeptic.com/blog' + this.props.pathname
		var content = this.state.content

		content = this.replaceLatex(content, "$$", "<p>", "</p>")
		content = this.replaceLatex(content, "$", "", "")

		console.log(content)
		
		MathJax.Hub.Config({tex2jax: {processEscapes: true, 
	        processEnvironments: false, inlineMath: [ ['$','$'] ], 
	        displayMath: [ ['$$','$$'] ] }, 
	        asciimath2jax: {delimiters: [ ['$','$'] ] }, 
	        "HTML-CSS": {minScaleAdjust: 125 } });
   		

		return (
			<div class="center">
				<span dangerouslySetInnerHTML={{__html: content}} />
				<MailingListBlogFooter />
				<ReactDisqus shortname={this.state.username} identifier={uid} />
			</div>
		)
	}
}
