import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {
    getBlogList,
    getActiveCategory,
    getPageCount,
    loadBlogList,
    getCategories,
    getPage,
    setCurrentPage,
    getNeedReload
} from '../../../redux/modules/blogReducer'
import BlogListItem from '../Components/BlogListItem'
import ReactPaginate from 'react-paginate';
import ParamRouter from '../../../components/Router'

@connect(
    state => ({
        posts: getBlogList(state),
        category: getActiveCategory(state),
        categories: getCategories(state),
        pageCount: getPageCount(state),
        page: getPage(state),
        needReload: getNeedReload(state)
    }),
    {loadBlogList, setCurrentPage}
)
export default class BlogList extends Component {

    handlePageClick = data => {
        const page = data.selected + 1
        const category = (this.props.category === 'all') ? null :this.props.category

        if (category) {
            ParamRouter.pushRoute('Category Page', {category, page})
        } else {
            ParamRouter.pushRoute('Page', {page})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.needReload){
            this.refresh(nextProps.category, nextProps.page)
        }
    }

    refresh = (category, page) => {
        this.props.loadBlogList(category, page)
        window.scrollTo(0,0)
    }

    render() {
        const {posts, category, categories, pageCount, page} = this.props;
        const categoryExist = (categories.indexOf(category) !== -1) || (!category || category === 'all');
        const showPaginate = (pageCount-1) > 1
        return (
            <Wrapper>
                {categoryExist && category &&
                (category !== 'all') && <CategoryTitle>{category}</CategoryTitle>}

                {categoryExist && posts &&
                    <Posts>
                        {posts.length === 0
                            ? <div>No posts found.</div>
                            : posts.map(post => <BlogListItem key={post.c_hash} {...post}/>)
                        }
                    </Posts>
                }

                {showPaginate && <PaginationContainer>
                    <ReactPaginate
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        previousLabel={"<"}
                        nextLabel={">"}
                        containerClassName={'pagination'}
                        initialPage={page-1}
                        breakLabel={<span>...</span>}
                        pageCount={pageCount-1}
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
    padding-left: 0px;
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
    text-align: center;
    
    &.break {
        width: 42px;
        height: 42px;
        line-height: 42px;
    }
    
    > a {
        width: 42px;
        height: 42px;
        line-height: 42px;
        display: block;
    }
  }
  
`
const Wrapper = styled.div`
    margin-top:20px;
    flex-grow: 1;
    flex-basis: 70%;
`

const Posts = styled.section``