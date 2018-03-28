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

  selectUser = user => this.dispatch(selectTagsUser(user))

  render() {
    const { selectedUser } = this.props
    return (
      <Container>
        <Heading>Manage Tags</Heading>
        <Box title={'User search'}>
          <UsersSearch onChange={this.selectUser} />
        </Box>

        <Box title={selectedUser ? 'User tags' : 'Select user'}>
          user tags form
        </Box>
      </Container>
    )
  }
}

export default connect(state => ({
  selectedUser: state.admin.getIn(['tags', 'user'])
}))(TagUsers)

const Container = styled.section``
const Heading = styled.h3``
const BoxWrapper = styled.div``
const BoxTitle = styled.div``
const BoxContent = styled.div``
