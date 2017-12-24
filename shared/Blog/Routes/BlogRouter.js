import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import isUndefined from 'lodash/isUndefined';
import { redirects_map } from '../../../redirects';

import NotFound from '../../NotFound/Components/NotFound'
import BlogArticle from "../Containers/BlogArticle"
import BlogTopNav from "../Components/BlogTopNav"
import BlogItem from "../Components/BlogItem"
import BlogList from "../Components/BlogList"
import BlogBreadCrumbs from '../Components/BlogBreadCrumbs'
import NoBlogs from "../Components/NoBlogs"
import Error from "../../Common/Components/Error"
import Loading from "../../Common/Components/Loading"
import transform_pathname from "../../utils/transform_pathname"

import {changePageTitle} from '../../Layout/Actions/LayoutActions';

class BlogRouter extends React.Component {

	constructor(props) {
		super(props)
	}

    componentDidMount() {
        const {dispatch} = this.props;
        //const {title} = BlogRouter.getPageMeta(this.props);
        //dispatch(changePageTitle(title));
    }

    static getPageMeta(state) {
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
	}

	filter_blogs(allblogs, pathname) {
	    var blogs = []

	    // ???? 
	    //var redirect = redirects_map[pathname]
	    //if (redirect) {
	    //  pathname = redirect
	    //}
	    var k = '/blog'
	    var path = pathname.substring(k.length, pathname.length)
	    console.log("inject_blog router path=" + path)
	    var limit = 100
	    var count = 0
	    var i = 0
	    var l = allblogs.length
	    while (i < l && count < limit) {
	        var blog = allblogs[i]
	        var pn = blog['prettyname']
	        if (pn.indexOf(path) == 0) {
                blogs.push(blog)
                count += 1                
	        }
	        i += 1
	    }
	    var total = blogs.length
	    return blogs
	}

	render() {
		console.log(this.props.location.pathname)
		var pathname = this.props.location.pathname
		var pname = pathname.substring(5, pathname.length)
		var oblogs = this.props.blogs.toJS()
		var allblogs = oblogs['blogs']
		var folders = oblogs['folders']
		var blogs = this.filter_blogs(allblogs, pathname)
	    if (blogs.length == 0) {
	        console.log("No blogs loaded")
	        return <NoBlogs />
	    } else if (blogs.length == 1) {
	    	console.log("one blog")
	    	console.log(blogs[0])
			return <BlogItem blog={blogs[0]} />
		} else {
			return (
				<div className="center">
					<BlogTopNav pathname={pathname} blogs={blogs} />
					<div className="center">
						<BlogList blogs={blogs} />
					</div>
				</div>
			)
		}
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
