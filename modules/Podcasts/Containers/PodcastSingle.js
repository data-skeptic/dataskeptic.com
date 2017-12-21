import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import ReactDisqusComments from 'react-disqus-comments'
import {getSingle} from '../../../redux/modules/podcastReducer'
import Podcast from '../Components/Podcast'
import {Form} from "react-final-form"
import SubscriptionForm from '../../Forms/SubscriptionForm'
import Container from "../../../components/Container";

const DisqusUsername = `dataskeptic`

@connect(
    state => ({
        episode: getSingle(state)
    }),
    {}
)
export default class BlogSingle extends Component {
    constructor() {
        super()
        this.state = {
            playing: false
        }
    }

    togglePlay = () => {
        const {playing} = this.state;
        this.setState({playing: !playing})
    }

    render() {
        const {episode} = this.props;

        const {playing} = this.state;
        if (!episode) {
            return <div>Not found.</div>
        }

        const uid = 'http://dataskeptic.com/blog' + episode.prettyname;

        return (
            <Container title={episode.title}>
                <Wrapper>
                    <Podcast post={episode} playing={playing} togglePlay={this.togglePlay}/>

                    <SubscriptionForm/>

                    <ReactDisqusComments
                        shortname={DisqusUsername}
                        identifier={uid}
                        title={episode.title}
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
    flex-grow: 1   
`