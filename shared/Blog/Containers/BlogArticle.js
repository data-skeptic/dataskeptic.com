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
import ProposeButton from '../Components/ProposeButton'
import PostBodyContainer from './PostBodyContainer'

import {get_folders} from '../../utils/redux_loader'

import isEmpty from 'lodash/isEmpty';
import {loadBlogPost, stopBlogLoading} from '../Actions/BlogsActions';
import LoadingBlogArticle from "../Components/LoadingBlogArticle";

class BlogArticle extends Component {
    constructor(props) {
        super(props)
    }

    isPostFetched(props) {
        const post = props.currentPost.toJS();
        if (!post || !post.prettyname) {
            return false;
        }

        return ('/blog' + post.prettyname) === props.postUrl;
    }

    componentDidMount() {
        if (!this.isPostFetched(this.props)) {
            this.props.loadBlogPost(this.props.postUrl);
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

    isGithubPost(uri) {
        return uri.indexOf('.md') > -1;
    }

    isJupyterPost(uri) {
        return uri.indexOf('.ipynb') > -1;
    }

    generateEditGithubPageUrl(prettyName, env) {
        return `https://github.com/data-skeptic/blog/edit/${env}${prettyName}.md`;
    }

    generateEditJupyterPageUrl(prettyName, env) {
        return `https://github.com/data-skeptic/blog/blob/${env}${prettyName}.ipynb`;
    }

    getProposeEditUrl(currentPost) {
        if (isEmpty(currentPost)) {
            return null;
        }

        if (this.isGithubPost(currentPost.uri)) {
            return this.generateEditGithubPageUrl(currentPost.prettyname, currentPost.env);
        }

        if (this.isJupyterPost(currentPost.uri)) {
            return this.generateEditJupyterPageUrl(currentPost.prettyname, currentPost.env);
        }

        return null;
    }

    render() {

        const {currentPost, isLoading, contributors, disqusUsername, postUrl} = this.props;

        if (isLoading) {
            return <LoadingBlogArticle />
        }

        const post = currentPost.toJS();
        const guid = post.guid;
        const isEpisode = !isUndefined(guid);

        const prettyName = post.prettyname;

        const author = (post.author || '').toLowerCase();

        const uid = 'http://dataskeptic.com/blog' + prettyName;

        const {content, title} = post;

        let contributor = null;

        try {
            contributor = contributors.getIn([author]).toJS();
        } catch (e) {
            // TODO:
        }

        // Don't show author box for episodes and transcripts
        if (prettyName.indexOf("/episodes/") === 0) {
            contributor = null;
        }

        if (prettyName.indexOf("/transcripts/") === 0) {
            contributor = null;
        }

        const related = post.related || [];

        const proposeEditUrl = this.getProposeEditUrl(post);

        return (
            <div className="center">

                { isEpisode ? <LatestEpisodePlayer guid={guid} /> : null }

                {contributor ? <BlogAuthorTop contributor={contributor}/> : <div></div> }

                <div id='blog-content'>
                    <PostBodyContainer content={content}/>

                </div>

                <RelatedContent items={related} />

                { contributor ? <BlogAuthorBottom contributor={contributor}/> : <div></div> }

                <MailingListBlogFooter />

                <hr />

                { proposeEditUrl ? <ProposeButton editUrl={proposeEditUrl}/> : null }

                <hr />

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
