import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import AddContributor, {
  FORM_KEY
} from '../../../Contributors/Forms/AddContributor'
import { strictForm } from '../../../styles'
import { addContributor } from '../../../reducers/CmsReducer'

class ContributorAddFormController extends Component {
  state = {
    defaultValuesOld: {
      sort_rank: 0
    },
    defaultValues: {
      author: '123',
      bio: '<p>123123123</p>↵',
      img:
        'https://s3.amazonaws.com/dev.dataskeptic.com/Screen Shot 2018-04-06 at 4.48.59 PM.png',
      linkedin: '123',
      prettyname: '2123132',
      sort_rank: '2',
      twitter: '123'
    }
  }

  save = () => this.props.dispatch(submit(FORM_KEY))

  submit = data => this.props.dispatch(addContributor(data))

  render() {
    const { loading, error, success } = this.props

    return (
      <Container>
        <code>
          {JSON.stringify({
            loading,
            error,
            success
          })}
        </code>
        <AddContributor
          initialValues={this.state.defaultValues}
          onSubmit={this.submit}
        />
        <Buttons>
          <SaveButton onClick={this.save} disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </SaveButton>
        </Buttons>

        {error && <Error>{error}</Error>}
        {success && <Success>Success</Success>}
      </Container>
    )
  }
}

export default connect((state, ownProps) => ({
  loading: state.cms.getIn(['contributors', 'processing']),
  error: state.cms.getIn(['contributors', 'error']),
  success: state.cms.getIn(['contributors', 'success'])
}))(ContributorAddFormController)

const Container = styled.div`
  ${strictForm};
  display: flex;
  flex-direction: column;

  textarea {
    min-height: 100px;
  }
`

const Row = styled.div`
  display: flex;
`

const Buttons = Row.extend`
  justify-content: flex-end;
`

const SaveButton = styled.button`
  border: none;
  margin-top: 14px;
  border: 0;
  background: #f0d943;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  color: #333;
  padding: 10px 18px;
`

const Error = styled.div`
  color: red;
`

const Success = styled.div`
  color: green;
`
