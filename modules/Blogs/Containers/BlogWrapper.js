import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {
    getBlogList,
    getActiveCategory,
    getPageCount,
    loadBlogList,
    getCategories
} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'
import ReactPaginate from 'react-paginate';
import PodcastPlayer from "../../Podcasts/Containers/PodcastPlayer";
import ParamRouter from '../../../components/Router'


@connect(
    state => ({
        posts: getBlogList(state),
        category: getActiveCategory(state),
        categories: getCategories(state),
        pageCount: getPageCount(state),

    }),
    {loadBlogList}
)
export default class BlogList extends Component {
    handlePageClick = data => {
        console.log(data);
        this.props.loadBlogList(data.selected + 1)
        ParamRouter.pushRoute('Page', {page: data.selected + 1})
    }

    render() {
        const {posts, category, categories, pageCount} = this.props;
        const categoryExist = (categories.indexOf(category) !== -1) || (!category || category === 'all');
        return (
            <Wrapper>
                {categoryExist && category &&
                (category !== 'all') && <CategoryTitle>{category}</CategoryTitle>}

                {categoryExist && posts && posts.map(post => <BlogListItem key={post.c_hash} {...post}/>)}

                {category === 'all' && <PaginationContainer>
                    <ReactPaginate
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        previousLabel={"<"}
                        nextLabel={">"}
                        containerClassName={'pagination'}
                        initialPage={0}
                        breakLabel={<span>...</span>}
                        pageCount={pageCount}
                        onPageChange={this.handlePageClick}
                        disableInitialCallback
                    />
                </PaginationContainer>}
                {!categoryExist && <h2> Error </h2>}
            </Wrapper>
        )
    }
}

const CategoryTitle = styled.h2`
  text-transform: capitalize;
  padding: 0;
  font-size: 26px;
  color: #3a3b3b;
`
const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    list-style: none;
  }
  
  .pagination > li {
    &.selected {
      background-color: ${props => props.theme && props.theme.colors.primary};
      color: #fff;
    }
    &.disabled {
      cursor: not-allowed;
    }
    cursor: pointer;
    min-width: 22px;
    padding: 10px;
    text-align: center;
  }
  
`
const Wrapper = styled.div`
    margin-top:20px;
    flex-grow: 1;
    flex-basis: 70%;
`
