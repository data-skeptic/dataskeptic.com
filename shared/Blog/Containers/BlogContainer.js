import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import NotFound from '../../NotFound/Components/NotFound'
import BlogList from "../Components/BlogList"
import BlogNav from "../Components/BlogNav"
import BlogItem from "../Components/BlogItem"
import Error from "../../Common/Components/Error"
import Loading from "../../Common/Components/Loading"

import transform_pathname from "../../utils/transform_pathname"

import {get_blogs_list} from '../../utils/redux_loader'

class BlogContainer extends React.Component {
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
		const {total} = this.props;
		const oblogs = this.props.blogs.toJS();
		const blog_focus = oblogs.blog_focus;
		const folders = oblogs.folders || [];
		let blogs = oblogs.blogs || [];

		if (blogs.length === 0) {
			return <div><Loading /></div>
		}

		let opathname = this.props.pathname
		if (!opathname) {
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

		if (pathname === "" || pathname === "/") {
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

export default connect(
	state => ({
		player: state.player,
		pagination: state.blogs.getIn(['pagination']),
		total: state.blogs.getIn(['total']),
		blogs: state.blogs,
		episodes: state.episodes,
		site: state.site
	})
)(BlogContainer)

