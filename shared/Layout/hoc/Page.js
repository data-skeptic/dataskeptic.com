import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

export default function(options) {
  return class WrappedPage extends Component {
    static defaultProps = {
      
    }

    render() {
      const { ...rest } = this.props

      return (
        <Page>
          page
        </Page>
      )
    }
  }
}

const Page = styled.div``
