import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default class MailingList extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    id: '',
    heading: 'Subscribe to our mailing list'
  }

  state = {
    email: ``
  }

  onChange = e => {
    const email = e.target.value
    this.setState({ email })
  }

  setMessage = (message, color, time) => {
    this.setState({ message, color });
    let timer;
    timer = setTimeout(() => {
      this.setState({ message: undefined, color: undefined });
      clearTimeout(timer);
    }, time || 5000);
  }
  handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/v1/auth/signup', { ...this.state, password: '', src: 'email_signup' })
      .then(({ data }) => {
        const message = data.success ? 'Thank you for signing up for our mailing list!' : 'It looks like that email address is already signed up.';
        const color = data.success ? '#3d963d' : '#f00';
        this.setMessage(message, color);
        this.props.onSubmit(e, data);
      })
      .catch(err => {
        console.error(err);
        this.setMessage('It looks like something went wrong.', '#f00');
      });
  }

  render() {
    const { heading, id } = this.props
    return (
      <Wrapper>
        <Form
          method="post"
          className="validate"
        >
          <Heading htmlFor={`mce-EMAIL${id}`}>{heading}</Heading>
          <Inner>
            <Input
              type="input"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              id={`mce-EMAIL${id}`}
              placeholder="Email address"
              required
            />
            <Submit name="subscribe" onClick={this.handleSubmit}>
              Subscribe
            </Submit>
          </Inner>
          <Inner>
            <InputAlert style={{ color: this.state.color }}>{this.state.message && this.state.message}</InputAlert>
          </Inner>
        </Form>
      </Wrapper>
    )
  }
}

const InputAlert = styled.label`
  display: block;
  minHeight: 1.5em;
  width: 100%;
  text-align: center;
`
const Wrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`

const Heading = styled.label`
  color: #2d1454;
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`

const Form = styled.form``

const Input = styled.input`
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #e1e3e2;
  margin-right: 12px;
  border-radius: 5px;
  padding: 0px 20px;
  line-height: 38px;
`

const Submit = styled.button`
  width: 120px;
  height: 40px;
  background: #f0d943;
  font-size: 16px;
  color: #333333;
  border: none;
  border-radius: 5px;
`

const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
    border: 0;
    padding: 0;

    ${Input} {
      margin-right: 0px;
    }

    ${Submit} {
      width: auto;
      margin-top: 15px;
    }
  }
`
