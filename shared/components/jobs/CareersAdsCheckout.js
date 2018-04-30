import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddJob, { tomorrow } from '../../Jobs/Forms/AddJob'
import styled from 'styled-components'
import { addJob } from '../../reducers/AdminReducer'
import { container, strictForm } from '../../styles'
import { changePageTitle } from '../../Layout/Actions/LayoutActions'
import { get_products } from '../../utils/redux_loader'

class CareersAdsCheckout extends Component {
  state = {
    initialValues: {
      go_live_date: tomorrow.format('YYYY-MM-DD')
    }
  }

  static getPageMeta() {
    return {
      title: 'Checkout Add Job | Data Skeptic'
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { title } = CareersAdsCheckout.getPageMeta()

    dispatch(changePageTitle(title))
  }

  render() {
    const { history, error, success, request } = this.props
    const { initialValues } = this.state

    return (
      <Container history={history}>
        <h3>Checkout Add Job</h3>
      </Container>
    )
  }
}
export default connect(state => ({}))(CareersAdsCheckout)

const Container = styled.div`
  ${container};
`
