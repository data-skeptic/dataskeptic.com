import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import ReactDisqusComments from 'react-disqus-comments'
import {getSingle} from '../../../redux/modules/blogReducer'
import Post from '../Components/Post'
import AuthorBlock from '../Components/AuthorBlock'
import ProposeButton from '../Components/ProposeButton'
import RelatedContent from '../Components/RelatedContent'
import {Form} from "react-final-form"
import SubscriptionForm from '../../Forms/SubscriptionForm'
import EpisodePlayer from "../../Player/Components/EpisodePlayer";

import Container from "../../../components/Container";

const generateEditGithubPageUrl = (prettyName, env) => `https://github.com/data-skeptic/blog/edit/${env}${prettyName}.md`
const generateEditJupyterPageUrl = (prettyName, env) => `https://github.com/data-skeptic/blog/blob/${env}${prettyName}.ipynb`

const isGithubPost = (uri) => uri && uri.indexOf('.md') > -1
const isJupyterPost = (uri) => uri && uri.indexOf('.ipynb') > -1

const getProposeEditUrl = (currentPost) => {
    if (!currentPost || !currentPost.uri) return null

    if (isGithubPost(currentPost.uri)) {
        return generateEditGithubPageUrl(currentPost.prettyname, currentPost.env);
    }

    if (isJupyterPost(currentPost.uri)) {
        return generateEditJupyterPageUrl(currentPost.prettyname, currentPost.env);
    }

    return null;
}

const DisqusUsername = `dataskeptic`

const isEpisodePost = (post) => (post.category === 'episodes' || post.category === 'transcripts')

@connect(
    state => ({
        post: getSingle(state)
    }),
    {}
)
export default class BlogSingle extends Component {

    handleNewComment = () => console.dir('comment')

    hasEpisode = () => isEpisodePost(this.props.post)

    render() {
        const {post} = this.props;

        if (!post) {
            return <div>NO!</div>
        }

        const uid = 'http://dataskeptic.com/blog' + post.prettyname;

        const proposeEditUrl = getProposeEditUrl(post);

        return (
            <Container title={post.title}>
                <Wrapper>
                    {this.hasEpisode() && <EpisodePlayer post={post}/> }

                    <Post post={post}/>
                    <AuthorBlock author={post.author}/>
                    <SubscriptionForm />

                    {post.related && <RelatedContent items={post.related}/>}

                    {proposeEditUrl && <ProposeButton editUrl={proposeEditUrl}/>}

                    <ReactDisqusComments
                        shortname={DisqusUsername}
                        identifier={uid}
                        title={post.title}
                        url={uid}
                        onNewComment={this.handleNewComment}
                    />
                </Wrapper>
            </Container>
        )
    }
}

const Wrapper = styled.div`
    max-width:800px;
    margin: 0px auto;
    margin-top:20px;
    flex-grow: 1;
    
`
const Date = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #7d8080;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
`;