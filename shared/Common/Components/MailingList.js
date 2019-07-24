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

  handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/v1/auth/signup', { ...this.state, password: '', src: 'email_signup' })
      .then(({ data }) => {
        const message = data.success ? 'Thank you for signing up for our mailing list!' : 'It looks like that email address is already signed up.';
        const color = data.success ? '#3d963d' : '#f00';
        this.setState({ message, color });
        let toast;
        toast = setTimeout(() => {
          this.setState({ message: undefined, color: undefined });
          clearTimeout(toast);
        }, 5000);
        console.log({onSubmit});
        onSubmit(e);
      })
      .catch(err => console.error);
  }

  render() {
    const { heading, id, onSubmit } = this.props
    return (
      <Wrapper>
        <Form
          method="post"
          className="validate"
          onSubmit={onSubmit}
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
            <input name="password" type="hidden" value="" />
            <Submit name="subscribe" onClick={this.handleSubmit}>
              Subscribe
            </Submit>
          </Inner>
          <Inner>
            <label style={{ display: 'block', color: this.state.color, minHeight: '1.5em' }}>{this.state.message && this.state.message}</label>
          </Inner>
        </Form>
        {/* {this.state.message && <Toast message={this.state.message} />} */}
      </Wrapper>
    )
  }
}

const Toast = ({
  message = ''
}) => <ToastMessage>{message}</ToastMessage>;

const ToastMessage = styled.div`
  position: fixed;
  top:95px;
  right:15px;
  width:200px;
  height:auto;
  background-color:#948c76;
  color:#fff;
  border-radius:4px;
  padding:15px 30px;
  animation-duration:0.5s;
  animation-name:slidein;

  @keyframes slidein { from { right: -215px; } to { right: 15px; } }
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
