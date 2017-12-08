import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getBlogList, getActiveCategory} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'
import PodcastPlayer from "../../Podcasts/Containers/PodcastPlayer";

@connect(
    state => ({
        posts: getBlogList(state),
        category: getActiveCategory(state)
    }),
    {}
)
export default class BlogList extends Component {

    render() {
        const {posts, category} = this.props;
        return (
            <Wrapper>
                {category && <CategoryTitle>{category}</CategoryTitle>}
                {posts.map(post => <BlogListItem key={post.c_hash} post={post}/>)}
            </Wrapper>
        )
    }
}

const CategoryTitle = styled.h2`
  text-transform: capitalize;
  padding: 0;
  font-family: "SF Light";
  font-size: 26px;
  color: #3a3b3b;
`

const Wrapper = styled.div`
    margin-top:20px;
    flex-grow: 1;
    flex-basis: 70%;
`
