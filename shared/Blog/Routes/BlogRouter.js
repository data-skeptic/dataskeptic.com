/*
	Will ship you to either BlogArticle for a post
	or to Blog.js for listings
*/
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import isUndefined from 'lodash/isUndefined';
import { redirects_map } from '../../../redirects';

import NotFound from '../../NotFound/Components/NotFound'
import BlogArticle from "../Containers/BlogArticle"
import BlogNav from "../Components/BlogNav"
import BlogItem from "../Components/BlogItem"
import Error from "../../Common/Components/Error"
import Loading from "../../Common/Components/Loading"
import transform_pathname from "../../utils/transform_pathname"
import getBlog from "../../daos/getBlog"

import {changePageTitle} from '../../Layout/Actions/LayoutActions';

class BlogRouter extends React.Component {

	constructor(props) {
		super(props)
	}

    componentDidMount() {
        const {dispatch} = this.props;
        const {title} = BlogRouter.getPageMeta(this.props);
        dispatch(changePageTitle(title));
    }

    static getPageMeta(state) {
		// TODO: add 404 api method and provide not found page
		const isExists = state.blogs.getIn(['blog_focus', 'blog']);
		if (!isExists) {
			return {
				title: 'Data Skeptic',
				description: ''
			}
		}

		const post = state.blogs.getIn(['blog_focus', 'blog']).toJS();
        const isEpisode = !isUndefined(post.guid);

        let meta = {
            title: `${post.title} | Data Skeptic`,
			description: post.desc
        };

        if (isEpisode) {
			meta.image = post.preview;
		}

        return meta;
    }

	componentDidMount() {
		var dispatch = this.props.dispatch
		var pathname = this.props.location.pathname
		var k = '/blog'
		var prettyname = ""
		if (pathname.length > k.length && pathname.indexOf(k) == 0) {
			prettyname = pathname.substring(k.length, pathname.length)
		}
		var oblogs = this.props.blogs.toJS()
		var env = oblogs.env
		var folders = oblogs.folders || []
		var blog_focus = oblogs.blog_focus
		if (prettyname != blog_focus.prettyname) {
			getBlog(dispatch, env, prettyname)
		}
	}

	render() {
		var pathname = this.props.location.pathname
		var k = '/blog'
		var prettyname = ""
		if (pathname.length > k.length && pathname.indexOf(k) == 0) {
			prettyname = pathname.substring(k.length, pathname.length)
		}
		var oblogs = this.props.blogs.toJS()
		if (oblogs.error) {
			return <div>not found!</div>
		}

		var folders = oblogs.folders || []
		var blog_focus = oblogs.blog_focus
		
		/*
			Check against folders
		*/
		var i=0
		while (i < folders.length) {
			var folder = "/" + folders[i] + "/"
			if (folder == prettyname) {
				return null;
				return <Blog pathname={pathname} />
			}
			i += 1
		}
		/*
			Must be a blog page if we got here
		*/
		var redirect = redirects_map[pathname]
		if (redirect) {
			pathname = redirect
		}

		return (
			<div className="center">
				<BlogArticle postUrl={pathname} />
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => ({
		player: state.player,
		blogs: state.blogs,
		episodes: state.episodes,
		site: state.site
	}))
(BlogRouter)

