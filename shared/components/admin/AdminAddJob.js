import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import AddJob from '../../Jobs/Forms/AddJob'
import styled from 'styled-components'
import { addJob } from '../../reducers/AdminReducer'
import moment from 'moment/moment'

class AdminAddJob extends Component {
  state = {
    // initialValues: {
    //   go_live_date: moment().format('YYYY-MM-DD')
    // },
    initialValues: {
      go_live_date: '2018-03-27',
      company_logo: 'https://www.facebook.com/events/calendar/',
      company_url: 'http://facebook.com',
      type: 'full_time',
      location: '12312',
      job_url: 'https://www.facebook.com/events/calendar/',
      title: '123',
      company: 'http://facebook.com',
      description: 'description'
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
`
