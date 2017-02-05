import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import NotFound from './NotFound'
import BlogList from "./BlogList"
import BlogNav from "./BlogNav"
import BlogItem from "./BlogItem"
import Error from "./Error"
import Loading from "./Loading"
import transform_pathname from "../utils/transform_pathname"

import {get_blogs_list} from '../utils/redux_loader'

class Blog extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		var location = this.props.location
		if (location != undefined) {
			var pathname = location.pathname
			console.log(pathname)
			var dispatch = this.props.dispatch
			get_blogs_list(dispatch, pathname)
		}
		else {
			console.log("location is not defined")
		}
	}

	remove_type(typ, arr) {
		var sub = []
		var key = "/" + typ + "/"
		for (var i=0; i < arr.length; i++) {
			var blog = arr[i]
			var pn = blog.prettyname
			if (pn.indexOf(typ) == -1) {
				sub.push(blog)
			}
		}
		return sub
	}

	only_type(typ, arr) {
		var sub = []
		var key = "/" + typ + "/"
		for (var i=0; i < arr.length; i++) {
			var blog = arr[i]
			var pn = blog.prettyname
			if (pn.indexOf(key) != -1) {
				sub.push(blog)
			}
		}
		return sub
	}

	render() {
		var oblogs = this.props.blogs.toJS()
		var blog_focus = oblogs.blog_focus
		var folders = oblogs.folders || []
		var blogs = oblogs.blogs || []

		if (blogs.length == 0) {
			return <div><Loading /></div>
		}

		var opathname = this.props.pathname
		if (opathname == undefined) {
			opathname = this.props.location.pathname
		}
		var pathname = transform_pathname(opathname)

		for (var i=0; i < folders.length; i++) {
			var folder = folders[i]
			var sfolder = "/" + folder
			if (pathname.indexOf(sfolder) == 0 && pathname.length == sfolder.length) {
				blogs = this.only_type(folder, blogs)
			}
		}

		if (pathname == "" || pathname == "/") {
			blogs = this.remove_type("episodes", blogs)
			blogs = this.remove_type("transcripts", blogs)
		}

		return (
			<div className="center">
				<BlogNav folders={folders} pathname={pathname} />
				<BlogList blogs={blogs} />
			</div>
		)
	}
}

export default connect(state => ({ player: state.player, blogs: state.blogs, episodes: state.episodes, site: state.site }))(Blog)

