import React, { Component } from 'react'
import styled from 'styled-components'

const Arrow = ({ down }) => (
  <i className={`glyphicon glyphicon-chevron-${down ? 'down' : 'up'}`} />
)

export default class SectionBlock extends Component {
  toggle = () => this.props.onToggle()

  render() {
    const { title, children, open } = this.props
    return (
      <Block>
        <Head onClick={this.toggle} open={open}>
          <BlockTitle>{title}</BlockTitle>
          <Arrow down={!open} />
        </Head>
        {open && <BlockContent>{children}</BlockContent>}
      </Block>
    )
  }
}

const Block = styled.div`
  min-height: 60px;
  border: 1px solid #e6e6e6;
  margin-bottom: 20px;
`

const Head = styled.div`
  cursor: pointer;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  line-height: 60px;
  padding: 0px 20px;

  color: ${props => (props.open ? `#2D1454;` : '#333333')};
`

const BlockTitle = styled.div`
  font-size: 22px;
  flex-grow: 1;
`

const BlockContent = styled.div`
  padding: 10px 20px 20px 20px;

  .field-label,
  .field-input {
    padding: 0px;
  }
`
