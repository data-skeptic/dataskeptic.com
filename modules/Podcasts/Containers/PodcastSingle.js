import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getSingle} from '../../../redux/modules/podcastReducer'
import Podcast from '../Components/Podcast'
import {Form} from "react-final-form"
import SubscriptionForm from '../../Forms/SubscriptionForm'

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

        return (
            <Wrapper>
                <Podcast post={episode} playing={playing} togglePlay={this.togglePlay}/>
                {/*<AuthorBlock author={post.contributor}/>*/}
                <Form
                    onSubmit={(data) => alert(data)}
                    render={SubscriptionForm}
                />
            </Wrapper>
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