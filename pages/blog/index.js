import React, {Component} from "react"
import styled from "styled-components";
import BlogList from "../../modules/Blogs/Containers/BlogWrapper";
import CategoryList from "../../modules/Blogs/Containers/CategoryList";
import Container from "../../components/Container";
import Page from "../../hoc/Page";
import {
    loadBlogList,
    loadCategories,
    hasBlogs,
    hasCategories,
    setActiveCategory,
    setCurrentPage
} from "../../redux/modules/blogReducer";
import {media} from "../../modules/styles";

const ALL = 'all'

const getActualQuery = (category, page, isPage = false) => {
    if (!isNaN(category)) {
        page = category;
        category = ALL
    }

    if (!page) {
        page = 1;
    }
    if (!category) {
        category = ALL
    }

    if (isPage) {
        return page
    }
    else {
        return category;
    }
}

@Page
export default class Dashboard extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState();
        let {category, page} = query
        const promises = [];

        const pageActual = getActualQuery(category, page, true);
        const categoryActual = getActualQuery(category, page);

        promises.push(dispatch(setActiveCategory(categoryActual)))
        promises.push(dispatch(setCurrentPage(pageActual)))

        if (!hasBlogs(state)) {
            promises.push(dispatch(loadBlogList(categoryActual, pageActual)));
        }

        if (!hasCategories(state)) {
            promises.push(dispatch(loadCategories()));
        }

        await Promise.all(promises);
    }

    render() {
        return (
            <Container title={`Blog`}>
                <Wrapper>
                    <BlogList/>
                    <CategoryList/>
                </Wrapper>
            </Container>
        );
    }
}

const Wrapper = styled.div`
  display: flex;

    ${media.phone`
        flex-direction: column;
    `};
`