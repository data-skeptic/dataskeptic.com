import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddJob, { tomorrow } from '../../Jobs/Forms/AddJob'
import styled from 'styled-components'
import { addJob } from '../../reducers/AdminReducer'
import { strictForm } from '../../styles'
import page from '../../Layout/hoc/page'

class AdminAddJob extends Component {
  state = {
    initialValues: {
      go_live_date: tomorrow.format('YYYY-MM-DD')
    }
  }

  add = data => this.props.dispatch(addJob(data))

  render() {
    const { history, error, success, request } = this.props
    const { initialValues } = this.state

    return (
      <div>
        <h3>Add job</h3>

        <Container>
          <AddJob
            customError={error}
            onSubmit={this.add}
            showSubmit={true}
            allowSubmit={!request}
            submitValue={request ? 'Processing...' : 'Add'}
            initialValues={initialValues}
            customSuccess={success ? 'Job added.' : null}
          />
        </Container>
      </div>
    )
  }
}
export default page(
  connect(state => ({
    error: state.admin.getIn(['jobs', 'error']),
    request: state.admin.getIn(['jobs', 'request']),
    success: state.admin.getIn(['jobs', 'success'])
  }))(AdminAddJob),
  {
    title: `Admin Add Job`
  }
)

const Container = styled.div`
  ${strictForm};
`
