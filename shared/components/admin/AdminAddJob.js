import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import AddJob from '../../Jobs/Forms/AddJob'
import styled from 'styled-components'
import { addJob } from '../../reducers/AdminReducer'
import moment from 'moment/moment'

class AdminAddJob extends Component {
  state = {
    initialValues: {
      go_live_date: moment().format('YYYY-MM-DD')
    }
  }

  add = async data => {
    const res = await this.props.dispatch(addJob(data))
    console.dir(res)
    debugger;
  }

  render() {
    const { history } = this.props
    const { initialValues } = this.state

    return (
      <AdminLayout history={history}>
        <h3>Add job</h3>

        <Container>
          <AddJob
            onSubmit={this.add}
            showSubmit={true}
            allowSubmit={true}
            submitValue={'Add'}
            initialValues={initialValues}
          />
        </Container>
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminAddJob)

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
