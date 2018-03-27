import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import AddJob from '../../Jobs/Forms/AddJob'
import styled from 'styled-components'

class AdminAddJob extends Component {
  add = data => {
    console.log('add', data)
  }

  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Add job</h3>

        <Container>
          <AddJob
            onSubmit={this.add}
            showSubmit={true}
            allowSubmit={true}
            submitValue={'Add'}
          />
        </Container>
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminAddJob)

const Container = styled.div`
  .field-label {
    margin: 0px;
  }

  .field-input {
    > input {
      padding: 2px 6px;
    }
  }
`
