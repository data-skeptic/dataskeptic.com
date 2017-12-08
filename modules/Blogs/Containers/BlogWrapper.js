import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getBlogList, getActiveCategory, getPageCount,loadBlogList} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'
import ReactPaginate from 'react-paginate';
import PodcastPlayer from "../../Podcasts/Containers/PodcastPlayer";

@connect(
    state => ({
        posts: getBlogList(state),
        category: getActiveCategory(state),
        pageCount:getPageCount(state)
    }),
    {loadBlogList}
)
export default class BlogList extends Component {
    handlePageClick = data =>{
        this.props.loadBlogList(data.selected)
    }
    render() {
        const {posts, category,pageCount} = this.props;
        return (
            <Wrapper>
                {category && <CategoryTitle>{category}</CategoryTitle>}
                {posts && posts.map(post => <BlogListItem key={post.c_hash} {...post}/>)}
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    pageCount={pageCount}
                    onPageChange={this.handlePageClick}
                />
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
