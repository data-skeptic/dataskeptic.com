import React from "react"
import ReactDOM from "react-dom"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NotFound from '../../NotFound/Components/NotFound'
import BlogList from "../Components/BlogList"
import BlogNav from "../Components/BlogNav"
import BlogItem from "../Components/BlogItem"
import Error from "../../Common/Components/Error"
import Loading from "../../Common/Components/Loading"

import PaginationContainer from '../../Pagination/Containers/PaginationContainer';

import transform_pathname from "../../utils/transform_pathname"

import { loadBlogs } from '../Actions/BlogsActions';

class BlogContainer extends React.Component {

	constructor(props) {
		super(props);

		this.fetchPosts = this.fetchPosts.bind(this);
		this.onPaginatorPageClick = this.onPaginatorPageClick.bind(this);
	}

    fetchPosts(pageNum = 1) {
        const location = this.props.location;

        if (location) {
            const offset = ((pageNum - 1) * this.props.perPage);
            const add = ((pageNum === 1) ? 0 : 1);
            const limit = this.props.perPage;

            const pathname = `/blog?offset=${offset+add}&limit=${limit}`;
            this.props.loadBlogs(pathname);
        } else {
            console.log("location is not defined")
        }
	}

	componentWillMount() {
		this.fetchPosts(this.props.pageNum);
	}

    onPaginatorPageClick(pageNum) {
        if (window) {
            window.scrollTo(0, 0);
        }

        this.fetchPosts(pageNum);
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
		let {pageNum} = this.props;
		const {total, perPage} = this.props;

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

				<div className="row">
					<PaginationContainer
						currentPage={pageNum}
						total={total}
						perPage={perPage}
						onPageClick={this.onPaginatorPageClick}
					/>
				</div>
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => ({
		player: state.player,
        pageNum: +ownProps.params.pageNum || 1,

		perPage: 30,
		total: state.blogs.getIn(['total']),

		blogs: state.blogs,
		episodes: state.episodes,
		site: state.site
	}),
	(dispatch) => (bindActionCreators({
		loadBlogs
	}, dispatch))
)(BlogContainer)

