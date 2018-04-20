import React, { Component } from 'react'
import styled from 'styled-components'

export default class ClearableInput extends Component {
  static defaultProps = {
    error: false,
    placeholder: '',
    immediate: true,
    onBlur: () => {},
    onChange: () => {}
  }
  state = {
    value: ''
  }
  initRef = ref => (this.input = ref)

  handleChange = e => {
    const { immediate, onChange } = this.props
    const value = e.target ? e.target.value : e
    this.setState({ value })

    if (immediate) {
      onChange(value)
    }
  }

  handleKeyDown = e => {
    const { onChange } = this.props
    if (e.keyCode === 13) {
      onChange(this.state.value)
    }
  }
  clear = () => {
    const { onChange } = this.props
    const value = ''
    this.setState({ value })

    onChange(value)
  }
  blur = () => {
    this.props.onBlur(this.state.value)
  }

  onFocus() {
    this.input.focus()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.props.autoFocus && this.onFocus()
    }

    this.state.value = this.props.value
  }

  isEmpty = () => this.state.value.trim() === ''

  render() {
    const { error, placeholder } = this.props
    const { value } = this.state
    return (
      <Wrapper error={error}>
        <Input
          ref={this.initRef}
          value={value}
          placeholder={placeholder}
          onBlur={this.blur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        {!this.isEmpty() && <Close onClick={this.clear}>×</Close>}
      </Wrapper>
    )
  }
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background: #fff;
  border: 1px solid #d7d9d9;

  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  display: flex;

  ${props =>
    props.error &&
    `
    color: indianred;
  `};
`

export const Input = styled.input`
  flex: 1;
  padding: 8px 26px 8px 16px;
  border: none;
`

const Close = styled.button`
  position: absolute;
  right: 10px;
  top: 7px;
  width: 16px;
  border: none;
  color: #999;
  text-align: center;
  padding: 0px;
  font-size: 18px;

  text-align: center;
  vertical-align: top;

  &:hover {
    color: #d0021b;
  }
`
