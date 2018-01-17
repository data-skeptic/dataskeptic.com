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
import BlogShareBar from './BlogShareBar'
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
		var contributors = osite.contributors
		var contributor = contributors[author.toLowerCase()]
		var url = 'http://dataskeptic.com/blog' + prettyname
		if (prettyname.indexOf('/episodes/') == 0) {
			contributor = undefined
		}
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
		} else {
			let related_mp3_items = related_items.filter((item) => item.type === "mp3")
			if (related_mp3_items.length > 0) {
			    const item_data = related_mp3_items[0] // hope it only one
				let mp3_item = {
			        "img": "https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg",
                    "num": item_data['blog_id'],
                    "guid": item_data['content_id'],
                    "pubDate": blog['publish_date'],
                    "mp3": item_data['dest'],
                    "desc": item_data['body'],
                    "duration": item_data['duration'],
                    "title": item_data['title'],
                    "link": "https://dataskeptic.com/blog/"+prettyname
				}

                top = (
                    <div>
                        <EpisodePlayer episode={mp3_item} />
                    </div>
                )
			}
		}

    	var shareUrl = url
    	var exampleImage = "https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg"
    	if (!guid && contributor && contributor.img) {
    		exampleImage = contributor.img
    	}
    	return (
			<div className="blog-item-wrapper">
				<BlogBreadCrumbs prettyname={prettyname} exampleImage={exampleImage} />
				{top}
				<div className="content" dangerouslySetInnerHTML={{__html: content}} />
				<RelatedContent items={related_items} />
				<BlogShareBar shareUrl={shareUrl} title={title} exampleImage={exampleImage} />
				{bot}
				<MailingListBlogFooter />
	            <ReactDisqusComments
	                shortname={disqus_username}
	                identifier={url}
	                title={title}
	                url={url}
	                onNewComment={this.handleNewComment} />
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

