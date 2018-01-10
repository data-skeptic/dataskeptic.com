import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactDisqusComments from 'react-disqus-comments'
import snserror from '../../SnsUtil'
import EpisodePlayer from "../../components/EpisodePlayer"
import MailingListBlogFooter from "./MailingListBlogFooter"
import BlogLink from './BlogLink'
import RelatedContent from './RelatedContent'
import BlogBreadCrumbs from './BlogBreadCrumbs'
import BlogAuthorTop from './BlogAuthorTop'
import BlogAuthorBottom from './BlogAuthorBottom'
import Loading from "../../Common/Components/Loading"

class BlogItem extends React.Component {
	constructor(props) {
		super(props)
		var title = this.props.title
		var dispatch = this.props.dispatch
		var pathname = this.props.pathname
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
		var loading = this.props.loading
		var author = blog['author']
		var prettyname = blog.prettyname
		var src_file = blog.src_file
		var content = ocms.blog_content[src_file]
		if (content === undefined || loading) {
			return <Loading />
		}
		var related_items = blog.related
		console.log(blog)
		var contributors = osite.contributors
		var contributor = contributors[author.toLowerCase()]
		var url = 'http://dataskeptic.com/blog' + prettyname
		var title = blog['title']
		var top = <div></div>
		var bot = <div></div>
		if (contributor != undefined) {
			top = <BlogAuthorTop contributor={contributor} />			
			bot = <BlogAuthorBottom contributor={contributor} />
		}
		var guid = blog.guid
		if (guid) {
			var episode = undefined
			console.log(oepisodes)
			for (var ep of oepisodes.episodes) {
				if (ep.guid == guid) {
					episode = ep
				}
			}
			top = (
				<EpisodePlayer episode={episode} />
			)				
		}
		return (
			<div className="blog-item-wrapper">
				<BlogBreadCrumbs prettyname={prettyname} />
				{top}
				<div className="content" dangerouslySetInnerHTML={{__html: content}} />
				<RelatedContent items={related_items} />
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

