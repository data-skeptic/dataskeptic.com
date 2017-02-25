import React, {Component} from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import isUndefined from 'lodash/isUndefined';

import ReactDisqusComments from 'react-disqus-comments'
import LatestEpisodePlayer from "./LatestEpisodePlayer"
import MailingListBlogFooter from "../Components/MailingListBlogFooter"
import BlogLink from '../Components/BlogLink'
import BlogAuthorTop from '../Components/BlogAuthorTop'
import BlogAuthorBottom from '../Components/BlogAuthorBottom'
import Loading from '../../Common/Components/Loading'
import RelatedContent from '../Components/RelatedContent'

import {get_folders} from '../../utils/redux_loader'
import {get_related_content} from '../../utils/redux_loader'

import {loadBlogPost} from '../Actions/BlogsActions';

class BlogArticle extends Component {
    constructor(props) {
        super(props)
    }

    getPN() {
        console.dir(this.props.p);

        if (window && location && location.pathname) {
            return location.pathname
        }

        if (this.props.location && this.props.location.pathname) {
            return this.props.location.pathname
        }

        return ""
    }

    componentWillMount() {
        // debugger;
        // var dispatch = this.props.dispatch
        // var oblogs = this.props.blogs.toJS()
        // if (oblogs.folders.length == 0) {
        // 	get_folders(dispatch)
        // }
        var pathname = this.getPN()
        // var oblogs = this.props.blogs.toJS()
        // var blog_focus = oblogs.blog_focus
        //
        // console.log("Need to retrieve blog")
        // console.log(blog_focus.pathname)
        //
        // get_related_content(dispatch, pathname)
        this.props.loadBlogPost(pathname);
    }

    handleNewComment(comment) {
        // TODO: Maybe use a cognitive service here?
        console.log(comment.text);
    }


    isEpisode(prettyName) {
        return prettyName.indexOf('/episodes/') === 0;
    }

    isTranscript(prettyName) {
        return prettyName.indexOf('/transcripts/') === 0;
    }

    render() {
        // var pn = this.getPN()
        // var oepisodes = this.props.episodes.toJS()
        // var oblogs = this.props.blogs.toJS()
        // var blog_focus = oblogs.blog_focus
        // var osite = this.props.site.toJS()
        // var disqus_username = osite.disqus_username
        // var title = this.props.title
        // var isEpisode = false


        // var top = <div></div>
        // var focus_episode = oepisodes.focus_episode
        // if (focus_episode.episode != undefined) {
        // 	debugger;
        // 	console.log("!!!")
        // 	console.log(blog_focus)
        // 	console.log(focus_episode)
        // 	if (focus_episode.episode.guid == blog_focus.blog.guid) {
        // 		try {
        // 			top = (
        // 				<div className="home-player">
        // 					<LatestEpisodePlayer guid={focus_episode.guid} />
        // 				</div>
        // 			)
        // 			isEpisode = true
        // 		}
        // 		catch (err) {
        // 			console.log(err)
        // 			top = <div></div>
        // 		}
        // 	}
        // }
        // var bot = <div></div>
        // if (isEpisode && false) {
        // 	var tm = oblogs.transcript_map
        // 	if (tm != undefined) {
        // 		var guid = blog_focus.blog.guid
        // 		var b = tm[guid]
        // 		if (b != undefined) {
        // 			if (b.prettyname != undefined) {
        // 				if (b.prettyname.indexOf('/transcripts/') == -1) {
        // 					var pn = "/blog" + b.prettyname
        // 					bot = (
        // 						<div className='blog-transcript-link'>
        // 							Read the full transcript here:
        // 							<Link to={pn}>{title} transcripts</Link>.
        // 						</div>
        // 					)
        // 				}
        // 			}
        // 		}
        // 	}

        const {currentPost, isLoading, contributors, disqusUsername} = this.props;

        if (isLoading || !currentPost) {
            return <Loading />
        }

        const post = currentPost.toJS();
        const prettyName = post.prettyname;

        const showBio = (this.isEpisode(prettyName) || this.isTranscript(prettyName));
        const author = (post.author || '').toLowerCase();

        const uid = 'http://dataskeptic.com/blog' + prettyName;
        const { content, title } = post;
        const bot = '';
        const top = '';

        const contributor = contributors.getIn([author]).toJS();

        return (
            <div className="center">
                {top}

                <BlogAuthorTop contributor={contributor}/>

                <div id='blog-content'>
                    <span dangerouslySetInnerHTML={{__html: content}}/>
                </div>

                {bot}

                <RelatedContent />

                <BlogAuthorBottom contributor={contributor}/>

                <MailingListBlogFooter />

                <ReactDisqusComments
                    shortname={disqusUsername}
                    identifier={uid}
                    title={title}
                    url={uid}
                    onNewComment={this.handleNewComment}/>
            </div>
        )
    }
}
export default connect(
    (state, ownProps) => ({
        site: state.site,
        episodes: state.episodes,
        blogs: state.blogs,

        disqusUsername: state.site.getIn(['disqus_username']),

        isLoading: state.blogs.getIn(['postLoading']),
        currentPost: state.blogs.getIn(['currentPost']),

        contributors: state.contributors.getIn(['list']),
    }),
    (dispatch) => bindActionCreators({
        loadBlogPost
    }, dispatch)
)(BlogArticle)
