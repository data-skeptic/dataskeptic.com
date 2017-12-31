import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactDisqusComments from 'react-disqus-comments'
import snserror from '../../SnsUtil'
import EpisodePlayer from "../../components/EpisodePlayer"
import MailingListBlogFooter from "./MailingListBlogFooter"
import BlogLink from './BlogLink'
import BlogBreadCrumbs from './BlogBreadCrumbs'
import Loading from "../../Common/Components/Loading"

class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		var title = this.props.title
		var dispatch = this.props.dispatch
		var pathname = this.props.pathname
		setTimeout(function() {
		    dispatch({type: "SET_TITLE", payload: title })
		}, 10)
	}

	componentWillMount() {
		var dispatch = this.props.dispatch
		var blog = this.props.blog
		var src_file = blog.src_file
		dispatch({ type: "CMS_LOAD_BLOG_CONTENT", payload: {src_file, dispatch} })
	}

    handleNewComment(comment) {
        console.log(comment.text)
		snserror("Blog comment", comment.text, "ds-newblog")
	}

	render() {
		var osite = this.props.site.toJS()
		var ocms = this.props.cms.toJS()
		var oepisodes = this.props.episodes.toJS()
		var disqus_username = osite.disqus_username
		var blog = this.props.blog
		var prettyname = blog.prettyname
		var src_file = blog.src_file
		var content = ocms.blog_content[src_file]
		if (content == undefined) {
			return <Loading />
		}
		var url = 'http://dataskeptic.com/blog' + prettyname
		var title = blog['title']
		var top = <div></div>
		var bot = <div></div>
		var guid = blog.guid
		var episode = undefined
		if (guid) {
			top = (
				<EpisodePlayer episode={episode} />
			)				
		}
		return (
			<div className="center">
				<BlogBreadCrumbs prettyname={prettyname} />
				{top}
				<span dangerouslySetInnerHTML={{__html: content}} />
				{bot}
				<MailingListBlogFooter />
	            <ReactDisqusComments
	                shortname={disqus_username}
	                identifier={url}
	                title={title}
	                url={url}
	                onNewComment={this.handleNewComment}/>
			</div>
		)
	}
}
export default connect(state => ({ 
	site: state.site,
	cms: state.cms,
	episodes: state.episodes,
	blogs: state.blogs
}))(BlogItem)

