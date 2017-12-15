import React, {Component} from "react";
import Link from "../../components/Link";
import Icon from "react-fontawesome";
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

const ALL = 'all'

const getActualQuery = (category, page, isPage = false) => {

  if(!isNaN(category)) {
    page = category;
    category = ALL
  }

  if(!page) {
      page = 1;
  }
  if(!category) {
      category = ALL
  }

  if(isPage) {
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
        const pageActual = getActualQuery(category,page,true);
        const categoryActual = getActualQuery(category, page);

        if (category) {
            promises.push(dispatch(setActiveCategory(categoryActual)))
        }
        else {
            promises.push(dispatch(setActiveCategory(categoryActual)))
        }

        if (!hasBlogs(state)) {
            promises.push(dispatch(loadBlogList(pageActual)));
        }
        if (!hasCategories(state)) {
            promises.push(dispatch(loadCategories()));
        }
        await Promise.all(promises);
    }


    render() {
        return (
            <Container>
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
`

const Title = styled.h1`
  color: red;
  text-align: center;
`;
