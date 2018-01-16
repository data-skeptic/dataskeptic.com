import React from "react"

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
			<div className="mailing-list-signup-container">
				<div id="mc_embed_signup">
				<form action="//dataskeptic.us9.list-manage.com/subscribe/post?u=65e63d6f84f1d87759105d133&amp;id=dc60d554db" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
				    <div id="mc_embed_signup_scroll">
						<label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
						<input type="input" value={this.state.email} onChange={this.onChange} name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
					    <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
				    </div>
				</form>
				</div>
			</div>
		)
	}
}
