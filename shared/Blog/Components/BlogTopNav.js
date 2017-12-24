import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import BlogBreadCrumbs from './BlogBreadCrumbs'

class BlogTopNav extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var pathname = this.props.pathname
		var pname = pathname.substring(5, pathname.length)
		if (pname == "") {
			pname = "/"
		}
		console.log(pname)
		var blogs = this.props.blogs
		var cmap = {}
		for (var blog of blogs) {
			var arr = blog['prettyname'].split('/')
			var category = arr[1]
			if (category != "" && category != "episodes" && category != "transcripts") {
				if (category in cmap) {
					cmap[category] += 1
				} else {
					cmap[category] = 1
				}				
			}
		}
		var cats = Object.keys(cmap)
		cats.sort()
		console.log(cats)
		if (cats.length > 1) {
			return (
				<div className="blog-top-nav">
					<div>
					Subcategories:
					{
						cats.map((cat) => {
							var url = "/blog/" + cat
							return (
								<span className="category">
									&nbsp;<a href={url}>{cat}</a>&nbsp;|
								</span>
							)
						})
					}
					</div>
				</div>
			)
		} else {
			return (
				<div className="blog-top-nav">
					<a href="/blog/">root</a>/
				</div>
			)
		}
	}
};

export default connect(state => ({ }))(BlogTopNav)
