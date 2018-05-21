import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

export default (WrappedComponent, options) => {
  return class Page extends Component {
    static defaultProps = {}

    state = {
      meta: {
        title: options.title || 'Data Skeptic',
        description:
          options.description ||
          'Data Skeptic is your source for a perspective of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science. Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.',
        author: options.author || 'Kyle Polich',
        keywords: options.keywords || 'data skeptic, podcast,'
      }
    }

    updateMeta = nextMeta =>
      this.setState({
        meta: {
          ...this.state.meta,
          ...nextMeta
        }
      })

    render() {
      const { ...rest } = this.props
      const {
        meta: { title, description, author, keywords }
      } = this.state

      return (
        <Wrapper>
          <Helmet>
            <title>{title}</title>
            <meta name="author" content={author} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={``} />
          </Helmet>
          <WrappedComponent {...rest} updateMeta={this.updateMeta} />
        </Wrapper>
      )
    }
  }
}

const Wrapper = styled.section``
