import React from "react"
import styled from 'styled-components'

export default class MailingList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: ""
		}
	}

	onChange = (e) => {
		var email = e.target.value
		this.setState({email})
	}
	
	render() {
		return (
			<Wrapper>
				<Form action="//dataskeptic.us9.list-manage.com/subscribe/post?u=65e63d6f84f1d87759105d133&amp;id=dc60d554db" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
					<Heading htmlFor="mce-EMAIL">Subscribe to our mailing list</Heading>
					<Inner>
						<Input type="input" value={this.state.email} onChange={this.onChange} name="EMAIL" id="mce-EMAIL" placeholder="Email address" required />
						<Submit type="submit" name="subscribe" id="mc-embedded-subscribe">Subscribe</Submit>
					</Inner>
				</Form>
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	@media (max-width: 768px) {
		margin-top: 30px;
	}
`

const Heading = styled.label`
  color: #2D1454;
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`

const Form = styled.form`
`

const Input = styled.input`
  flex-grow: 1;
  background: #FFFFFF;
  border: 1px solid #E1E3E2;
  margin-right: 12px;
  border-radius: 5px;
  padding: 0px 20px;
  line-height: 38px;
`

const Submit = styled.button`
  width: 120px;
  height: 40px;
  background: #F0D943;
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