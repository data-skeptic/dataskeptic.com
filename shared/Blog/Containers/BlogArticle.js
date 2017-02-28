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


import isEmpty from 'lodash/isEmpty';
import { loadBlogPost, stopBlogLoading } from '../Actions/BlogsActions';

class BlogArticle extends Component {
    constructor(props) {
        super(props)
    }

    isPostFetched() {
        const post = this.props.currentPost.toJS();
        if (!post || !post.prettyname) {
            return false;
        }

        return ('/blog' + post.prettyname) === this.props.postUrl;
    }

    componentWillMount() {
        if (!this.isPostFetched()) {
            this.props.loadBlogPost(this.props.postUrl);
        } else {
            this.props.stopBlogLoading();
        }
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

        const {currentPost, isLoading, contributors, disqusUsername, postUrl} = this.props;

        if (isLoading || !currentPost) {
            return <Loading />
        }

        const post = currentPost.toJS();
        const guid = post.guid;
        const isEpisode = !isUndefined(guid);

        const prettyName = post.prettyname;

        const author = (post.author || '').toLowerCase();

        const uid = 'http://dataskeptic.com/blog' + prettyName;

        const { content, title } = post;

        let contributor = null;

        try {
            contributor = contributors.getIn([author]).toJS();
        } catch(e) {
            // TODO:
        }

        // Don't show author box for episodes and transcripts
        if (prettyName.indexOf("/episodes/") === 0) {
            contributor = null;
        }

        if (prettyName.indexOf("/transcripts/") === 0) {
            contributor = null;
        }

        return (
            <div className="center">
                { isEpisode ? <LatestEpisodePlayer guid={guid} /> : null }

                {contributor ? <BlogAuthorTop contributor={contributor}/> : null }

                <div id='blog-content'>
                    <span dangerouslySetInnerHTML={{__html: content}}/>
                </div>

                <RelatedContent />

                { contributor ? <BlogAuthorBottom contributor={contributor} /> : null }

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
        postUrl: ownProps.postUrl,

        site: state.site,
        episodes: state.episodes,
        blogs: state.blogs,

        disqusUsername: state.site.getIn(['disqus_username']),

        isLoading: state.blogs.getIn(['postLoading']),
        currentPost: state.blogs.getIn(['currentPost']),

        contributors: state.contributors.getIn(['list']),
    }),
    (dispatch) => bindActionCreators({
        loadBlogPost,
        stopBlogLoading
    }, dispatch)
)(BlogArticle)
