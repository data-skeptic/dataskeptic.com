import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import UsersSearch from './tags/UsersSearch'
import TagsSelect from './tags/TagsSelect'
import {
  loadUserTags,
  selectTagsUser,
  clearUserTags
} from '../../reducers/AdminReducer'

const Box = ({ title, children, ...rest }) => (
  <BoxWrapper>
    {title && <BoxTitle>{title}</BoxTitle>}
    <BoxContent>{children}</BoxContent>
  </BoxWrapper>
)

class TagUsers extends Component {
  defaultProps = {
    selectedUser: {}
  }

  selectUser = (user, valid) => {
    this.props.dispatch(selectTagsUser(user))

    if (valid) {
      this.loadUserTags(user)
    } else {
      this.props.dispatch(clearUserTags())
    }
  }

  loadUserTags = user => {
    this.props.dispatch(loadUserTags(user))
  }

  update = () => alert('in dev..')

  render() {
    const { selectedUser, userTags } = this.props
    return (
      <Container>
        <Heading>Manage Tags</Heading>
        <Box title={'User search'}>
          <UsersSearch onChange={this.selectUser} />
        </Box>

        <code>{JSON.stringify(userTags)}</code>
        <Box title={selectedUser ? 'User tags:' : 'Please, select user'}>
          {selectedUser && <TagsSelect email={selectedUser} value={userTags} />}
        </Box>

        <Buttons>
          <UpdateButton onClick={this.update} disabled={!selectedUser}>
            Update
          </UpdateButton>
        </Buttons>
      </Container>
    )
  }
}

export default connect(state => ({
  selectedUser: state.admin.getIn(['tags', 'user']),
  userTags: state.admin.getIn(['tags', 'list'])
}))(TagUsers)

const Container = styled.section``

const Heading = styled.h4``

const BoxWrapper = styled.div`
  margin-top: 2em;
`

const BoxTitle = styled.div``

const BoxContent = styled.div``

const Buttons = styled.div`
  margin-top: 2em;
`

const UpdateButton = styled.button`
  height: 40px;
  background: #f0d943;
  font-size: 16px;
  color: #333333;
  border: none;
  border-radius: 5px;
`
