import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import UsersSearch from './tags/UsersSearch'
import TagsSelect from './tags/TagsSelect'
import { selectTagsUser } from '../../reducers/AdminReducer'

const Box = ({ title, children, ...rest }) => (
  <BoxWrapper>
    {title && <BoxTitle>{title}</BoxTitle>}
    <BoxContent>{children}</BoxContent>
  </BoxWrapper>
)

class TagUsers extends Component {
  defaultProps = {
    selectedUser: null
  }

  selectUser = user => this.props.dispatch(selectTagsUser(user))

  render() {
    const { selectedUser } = this.props
    return (
      <Container>
        <Heading>Manage Tags</Heading>
        <Box title={'User search'}>
          <UsersSearch onChange={this.selectUser} />
        </Box>

        <Box title={selectedUser ? 'User tags' : 'Please, select user'}>
          <code>{JSON.stringify(selectedUser)}</code>
          {selectedUser && <TagsSelect email={selectedUser} />}
        </Box>
      </Container>
    )
  }
}

export default connect(state => ({
  selectedUser: state.admin.getIn(['tags', 'user'])
}))(TagUsers)

const Container = styled.section``

const Heading = styled.h4``

const BoxWrapper = styled.div`
  margin-top: 2em;
`

const BoxTitle = styled.div``

const BoxContent = styled.div``
