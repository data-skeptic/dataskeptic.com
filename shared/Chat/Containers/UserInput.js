import React, { Component } from "react"
import styled from "styled-components"

const animationDuration = 300

const normalize = val => val.toLowerCase().trim()

export default class UserInput extends Component {
  static defaultProps = {
    onSubmit: () => {},
	  focused: false
  }
  state = {
    value: "",
    focus: false
  }

  clear = () => {
    this.ref.scrollTop = this.ref.scrollHeight
    this.setState({ value: "" })
  }

  isEmpty = () => this.state.value === ""

  saveRef = ref => (this.ref = ref)
  handleSubmit = event => {
    event && event.preventDefault()
    const { onSubmit } = this.props
    const text = this.state.value

    const data = {
      sent: true,
      type: "text",
      text,
      plainText: normalize(text)
    }

    this.clear()
    onSubmit(data)
  }

  focus() {
	  this.ref.focus()
  }

  onFocus = () => {
    this.setState({ focus: true })
  }

  onBlur = () => {
    this.setState({ focus: false })
  }

  onChange = event => {
    this.setState({ value: event.target.value })
  }

  onKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleSubmit(event)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.onFocus()
      setTimeout(() => {
        this.focus()
      }, animationDuration)
    }
  }

  render() {
    const { focus, value } = this.state
    const { placeholder } = this.props

    const hasValue = !this.isEmpty()
    const active = hasValue || focus

    return (
      <Form active={active} onSubmit={this.handleSubmit}>
        <Input>
          <Text
	          innerRef={this.saveRef}
	          value={value}
            placeholder={placeholder}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </Input>
        <SendButton type="submit" big={hasValue}>
          <img src="/img/chat/send.svg" />
        </SendButton>
      </Form>
    )
  }
}

const Form = styled.form`
  min-height: 55px;
  border-top: 1px solid #e6e6e6;
  background: #f9faf9;
  display: flex;

  ${props =>
    props.active &&
    `
    background-color: #fff;
    box-shadow: 0 0 100px 0 rgba(150,165,190,.24);
	`};
`

const Input = styled.div`
  flex-grow: 1;
  position: relative;
`

const Text = styled.textarea`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 18px;
  padding-right: 30px;
  padding-left: 30px;
  border: none;
  resize: none;
  background: transparent;
  
 @media (max-width: 768px) {
    background-image: url('/img/svg/enter.svg') center right no-repeat;
 }
`

const SendButton = styled.button`
  margin-right: 16px;
  flex-basis: 32px;
  width: 32px;
  border: none;
  background: transparent;

  > img {
    max-width: 100%;
    max-height: 100%;
  }

  ${props =>
    props.big &&
    `
    transform: scale(1.2);
  `};
  
   @media (max-width: 768px) {
      padding: 0px;
   }
`
