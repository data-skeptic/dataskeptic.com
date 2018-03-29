import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import AddJob, { tomorrow } from '../../Jobs/Forms/AddJob'
import styled from 'styled-components'
import { addJob } from '../../reducers/AdminReducer'

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
      <AdminLayout history={history}>
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
      </AdminLayout>
    )
  }
}
export default connect(state => ({
  error: state.admin.getIn(['jobs', 'error']),
  request: state.admin.getIn(['jobs', 'request']),
  success: state.admin.getIn(['jobs', 'success'])
}))(AdminAddJob)

const Container = styled.div`
  .field-label {
    margin: 0px !important;
    font-weight: bold;
  }

  .field-input {
    input {
      padding: 2px 6px !important;
    }
  }

  @media (min-width: 768px) {
    .onrow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .field-container {
        flex: 1;
        margin-right: 10px;
      }
      
      &:last-child {
        margin-right: 0px;
      }
    }
  }
`
